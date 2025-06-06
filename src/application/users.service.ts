import { IUserRepository } from "../domain/repository/IUserRepository";
import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  LoginDto,
  ChangePasswordDto,
} from "../shared/dtos/usuario.dto";
import { validateDto } from "../shared/utils/validateDto";
import { ApiError } from "../shared/errors/apiError";
import bcrypt from "bcrypt";
import jwt from "../shared/utils/jwt";

export class UserService {
  /**
   * Constructor del servicio de usuarios.
   *
   * @param userRepository Repositorio de usuarios para interactuar con la base de datos.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Crea un nuevo usuario.
   *
   * @param dto Los datos necesarios para crear un usuario.
   * @returns El usuario creado.
   * @throws ApiError Si el correo electrónico ya está registrado.
   */
  async create(dto: CreateUsuarioDto) {
    const dtoValidate = await validateDto(CreateUsuarioDto, dto);

    const existingUser = await this.userRepository.findByEmail(dto.correo);
    if (existingUser) {
      throw new ApiError("El correo ingresado ya existe", 400, []);
    }

    const encriptarPassword = bcrypt.hashSync(dtoValidate.contraseña, 10);

    const sanitizedData: CreateUsuarioDto = {
      ...dtoValidate,
      contraseña: encriptarPassword,
      correo: dtoValidate.correo.toLowerCase().trim(),
    };

    return this.userRepository.create(sanitizedData);
  }

  /**
   * Encuentra un usuario por su ID.
   *
   * @param id El ID del usuario a buscar.
   * @returns El usuario encontrado.
   * @throws ApiError Si el usuario no se encuentra.
   */
  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError("Usuario no encontrado", 400, []);
    }

    return user;
  }

  /**
   * Recupera una lista de usuarios con paginación y filtro opcional.
   *
   * @param page El número de página para la paginación.
   * @param size El número de elementos por página.
   * @param filter Los filtros aplicados a la búsqueda (por ejemplo, "nombre" o "correo").
   * @returns Un objeto con los usuarios y el conteo total.
   * @throws ApiError Si los parámetros de paginación no son válidos.
   */
  async table(page: number, size: number, filter: any) {
    if (page <= 0 || size <= 0) {
      throw new ApiError("Los datos de paginacion no son validos", 400, []);
    }

    return this.userRepository.table(page, size, filter);
  }

  /**
   * Actualiza la información de un usuario.
   *
   * @param id El ID del usuario a actualizar.
   * @param dto Los datos a actualizar.
   * @returns El usuario actualizado.
   * @throws ApiError Si el usuario no existe o si el correo electrónico ya está en uso.
   */
  async update(id: string, dto: UpdateUsuarioDto) {
    const dtoValidate = await validateDto(UpdateUsuarioDto, dto);

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new ApiError(`El usuario no existe`, 404, []);
    }

    const sanitizedData = { ...dtoValidate };

    if (dtoValidate.correo) {
      const existingEmail = await this.userRepository.findByEmail(
        dtoValidate.correo
      );
      if (existingEmail) {
        throw new ApiError(
          "El nuevo correo electrónico ya está en uso",
          400,
          []
        );
      }
      sanitizedData.correo = dtoValidate.correo.toLowerCase().trim();
    }

    return this.userRepository.update(id, dtoValidate);
  }

  /**
   * Realiza el inicio de sesión de un usuario.
   *
   * @param dto Los datos de inicio de sesión (correo electrónico y contraseña).
   * @returns Un objeto con el token JWT y el mensaje de éxito.
   * @throws ApiError Si el correo no está registrado o si la contraseña es incorrecta.
   */
  async login(dto: LoginDto) {
    const dtoValidate = await validateDto(LoginDto, dto);
    const user = await this.userRepository.findByEmail(dtoValidate.correo);

    if (!user) {
      throw new ApiError("El correo no se encuentra registrado", 400, []);
    }

    const validPassword = bcrypt.compareSync(
      dtoValidate.contraseña,
      user.contraseña
    );

    if (!validPassword) {
      throw new ApiError("Contraseña incorrecta", 400, []);
    }

    const roles = user.UserRoles.map((r) => r.Roles.name);

    const token: any = jwt.sign({
      id: user.id,
      correo: user.correo,
      roles: roles,
    });

    return { token, message: "Inicio de sesión satisfactorio" };
  }

  /**
   * Elimina un usuario por su ID.
   *
   * @param id El ID del usuario a eliminar.
   * @returns Void, no retorna nada.
   */
  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  /**
   * Cambia la contraseña de un usuario.
   *
   * @param id El ID del usuario cuya contraseña se va a cambiar.
   * @param dto Los nuevos datos de la contraseña.
   * @returns Un objeto con el mensaje de éxito.
   * @throws ApiError Si el usuario no existe.
   */
  async changePassword(id: string, dto: ChangePasswordDto) {
    const dtoValidate = await validateDto(ChangePasswordDto, dto);

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError("Usuario no encontrado", 404, []);
    }

    const encriptarPassword = bcrypt.hashSync(dtoValidate.contraseña, 10);

    await this.userRepository.update(id, { contraseña: encriptarPassword });

    return { message: "Contraseña actualizada exitosamente" };
  }
}
