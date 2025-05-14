import { IRoleRepository } from "../domain/repository/IRoleRepository";
import { CreateRoleDto } from "../shared/dtos/roles.dto";
import { CreateUsuarioRolDto } from "../shared/dtos/usuarios-roles.dto";
import { validateDto } from "../shared/utils/validateDto";
import { ApiError } from "../shared/errors/apiError";
import { IUserRepository } from "domain/repository/IUserRepository";

export class RoleService {
  /**
   * Crea una instancia del servicio de roles.
   *
   * @param roleRepository Repositorio de roles.
   * @param userRepository Repositorio de usuarios.
   */
  constructor(
    private roleRepository: IRoleRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Crea un nuevo rol.
   *
   * Valida los datos de entrada y asegura que no exista un rol con el mismo nombre.
   *
   * @param dto Los datos necesarios para crear el rol.
   * @returns El rol creado.
   * @throws ApiError Si el nombre del rol ya está en uso.
   */
  async create(dto: CreateRoleDto) {
    const dtoValidated = await validateDto(CreateRoleDto, dto);

    const existing = await this.roleRepository.findByName(dtoValidated.name);
    if (existing) {
      throw new ApiError("Ya existe un rol con ese nombre", 400, []);
    }

    return this.roleRepository.create(dtoValidated);
  }

  /**
   * Busca un rol por su ID.
   *
   * @param id El ID del rol a buscar.
   * @returns El rol encontrado.
   * @throws ApiError Si el rol no existe.
   */
  async findById(id: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new ApiError("Rol no encontrado", 404, []);
    }
    return role;
  }

  /**
   * Obtiene todos los roles existentes en el sistema.
   *
   * @returns Una lista de todos los roles.
   */
  async findAll() {
    return this.roleRepository.findAll();
  }

  /**
   * Obtiene roles con paginación y filtrado.
   *
   * @param page El número de página.
   * @param size El tamaño de la página.
   * @param filter Los filtros a aplicar en la búsqueda.
   * @returns Una lista de roles paginada y filtrada.
   * @throws ApiError Si los datos de paginación son inválidos.
   */
  async table(page: number, size: number, filter: any) {
    if (page <= 0 || size <= 0) {
      throw new ApiError("Los datos de paginacion no son validos", 400, []);
    }

    return this.roleRepository.table(page, size, filter);
  }

  /**
   * Asigna un rol a un usuario.
   *
   * Valida que tanto el rol como el usuario existan y que el usuario no tenga ya el rol asignado.
   *
   * @param dto Los datos para asignar el rol al usuario.
   * @returns El registro de asignación de rol.
   * @throws ApiError Si el rol o el usuario no existen o si el rol ya está asignado.
   */
  async assignRoleToUser(dto: CreateUsuarioRolDto) {
    const dtoValidated = await validateDto(CreateUsuarioRolDto, dto);

    await this.usuarioExiste(dtoValidated.usuarioId);

    const roleExists = await this.roleRepository.findById(dtoValidated.roleId);
    if (!roleExists) {
      throw new ApiError("El rol especificado no existe", 404, []);
    }

    const userRoles = await this.roleRepository.findRolesByIds(
      dtoValidated.usuarioId,
      dtoValidated.roleId
    );

    if (userRoles) {
      throw new ApiError("El usuario ya posee dicho rol", 404, []);
    }

    return this.roleRepository.assignRoleToUser(dtoValidated);
  }

  /**
   * Elimina un rol asignado a un usuario.
   *
   * @param dto Los datos para eliminar la asignación de rol de un usuario.
   * @returns Una promesa que se resuelve cuando el rol se elimina del usuario.
   */
  async removeRoleFromUser(dto: CreateUsuarioRolDto) {
    const dtoValidated = await validateDto(CreateUsuarioRolDto, dto);

    await this.usuarioExiste(dtoValidated.usuarioId);

    return this.roleRepository.removeRoleFromUser(dtoValidated);
  }

  /**
   * Obtiene todos los roles asignados a un usuario.
   *
   * @param usuarioId El ID del usuario para obtener sus roles.
   * @returns Una lista de roles asignados al usuario.
   */
  async findRolesByUser(usuarioId: string) {
    await this.usuarioExiste(usuarioId);

    return this.roleRepository.findRolesByUsuarioId(usuarioId);
  }

  /**
   * Verifica si un usuario existe por su ID.
   *
   * @param usuarioId El ID del usuario a verificar.
   * @throws ApiError Si el usuario no existe.
   * @private
   */
  private async usuarioExiste(usuarioId: string) {
    const user = await this.userRepository.findById(usuarioId);

    if (!user) {
      throw new ApiError("El usuario no existe", 404, []);
    }
  }
}
