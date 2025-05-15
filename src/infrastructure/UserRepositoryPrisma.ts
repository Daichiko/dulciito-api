import { IUserRepository } from "../domain/repository/IUserRepository";
import { Usuario, UserWithoutPassword } from "domain/entity/user.entity";
import { prisma } from "../shared/config/connectionDB";
import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  UsuarioResponseDto,
} from "shared/dtos/usuario.dto";

export class UserRepositoryPrisma implements IUserRepository {
  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * @param data Los datos del usuario a crear.
   * @returns El usuario creado con su información completa.
   */
  async create(data: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    const usuario = await prisma.usuarios.create({
      data,
      select: { id: true, nombre: true, correo: true, fechaCreacion: true },
    });

    return usuario;
  }

  /**
   * Busca un usuario por su correo electrónico.
   *
   * @param email El correo electrónico del usuario a buscar.
   * @returns El usuario correspondiente al correo electrónico, incluyendo los roles del usuario.
   */
  async findByEmail(correo: string): Promise<Usuario> {
    const usuario = await prisma.usuarios.findUnique({
      where: { correo },
      include: {
        UserRoles: {
          include: {
            Roles: true,
          },
        },
      },
    });

    return usuario;
  }

  /**
   * Recupera una lista de usuarios paginados con filtro opcional.
   *
   * @param page El número de página para la paginación.
   * @param size El número de elementos por página.
   * @param filter Filtros opcionales a aplicar en la búsqueda (ej. "nombre", "email").
   * @returns Un objeto con los usuarios encontrados y el número total de registros.
   */
  async table(
    page: number,
    size: number,
    filter: any
  ): Promise<{
    data: UserWithoutPassword[];
    count: number;
  }> {
    const validFilters = ["nombre", "email"];
    const where: any = {};

    // Aplica los filtros a la búsqueda.
    for (const key in filter) {
      if (validFilters.includes(key)) {
        const value = filter[key];
        where[key] = { contains: value, mode: "insensitive" };
      }
    }

    // Recupera los datos paginados y el conteo total de usuarios con los filtros aplicados.
    const [data, count] = await Promise.all([
      prisma.usuarios.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.usuarios.count({ where }),
    ]);

    return { data, count };
  }

  /**
   * Encuentra un usuario por su ID.
   *
   * @param id El ID del usuario a buscar.
   * @returns El usuario sin la contraseña.
   */
  async findById(id: string): Promise<UsuarioResponseDto> {
    return await prisma.usuarios.findUnique({
      where: { id },
      select: { id: true, nombre: true, correo: true, fechaCreacion: true },
    });
  }

  /**
   * Actualiza un usuario por su ID.
   *
   * @param id El ID del usuario a actualizar.
   * @param data Los datos a actualizar en el usuario.
   * @returns El usuario actualizado sin la contraseña.
   */
  async update(
    id: string,
    data: UpdateUsuarioDto
  ): Promise<UsuarioResponseDto> {
    return await prisma.usuarios.update({
      where: { id },
      select: { id: true, nombre: true, correo: true, fechaCreacion: true },
      data,
    });
  }

  /**
   * Elimina un usuario por su ID.
   *
   * @param id El ID del usuario a eliminar.
   * @returns Void, no retorna nada.
   */
  async delete(id: string): Promise<void> {
    await await prisma.usuarios.delete({ where: { id } });
  }
}
