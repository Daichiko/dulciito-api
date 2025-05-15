import { PrismaClient } from "@prisma/client";
import { IRoleRepository } from "../domain/repository/IRoleRepository";
import { UsuariosRoles } from "../domain/entity/usuarios-roles.entity";
import { CreateRoleDto, RoleResponseDto } from "shared/dtos/roles.dto";

const prisma = new PrismaClient();

export class RoleRepositoryPrisma implements IRoleRepository {
  /**
   * Crea un nuevo rol en la base de datos.
   *
   * @param data Los datos del rol a crear.
   * @returns El rol creado.
   */
  async create(data: CreateRoleDto): Promise<RoleResponseDto> {
    return await prisma.roles.create({ data });
  }

  /**
   * Busca un rol por su ID.
   *
   * @param id El ID del rol a buscar.
   * @returns El rol encontrado o `null` si no existe.
   */
  async findById(id: string): Promise<RoleResponseDto> {
    return await prisma.roles.findUnique({
      where: { id },
    });
  }

  /**
   * Busca un rol por su nombre.
   *
   * @param name El nombre del rol a buscar.
   * @returns El rol encontrado o `null` si no existe.
   */
  async findByName(name: string): Promise<RoleResponseDto> {
    return await prisma.roles.findUnique({
      where: { name },
    });
  }

  /**
   * Obtiene todos los Roles existentes en la base de datos.
   *
   * @returns Una lista de todos los Roles.
   */
  async findAll() {
    return await prisma.roles.findMany();
  }

  /**
   * Obtiene una lista de Roles con paginación y filtrado.
   *
   * @param page El número de página para la paginación.
   * @param size La cantidad de elementos por página.
   * @param filter Los filtros para aplicar en la búsqueda (por ejemplo, nombre o descripción).
   * @returns Un objeto que contiene la lista de Roles y el total de registros.
   */
  async table(
    page: number,
    size: number,
    filter: any
  ): Promise<{
    data: RoleResponseDto[];
    count: number;
  }> {
    const validFilters = ["name", "description"];

    const where: any = {};

    // Aplica los filtros definidos
    for (const key in filter) {
      if (validFilters.includes(key)) {
        const value = filter[key];
        where[key] = { contains: value, mode: "insensitive" };
      }
    }

    const [data, count] = await Promise.all([
      prisma.roles.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.roles.count({ where }),
    ]);

    return { data, count };
  }

  /**
   * Asigna un rol a un usuario.
   *
   * @param data Los datos que contienen el ID del usuario y el ID del rol a asignar.
   * @returns El registro de la relación entre el usuario y el rol.
   */
  async assignRoleToUser(data: UsuariosRoles): Promise<UsuariosRoles> {
    return await prisma.usuariosRoles.create({
      data: {
        usuarioId: data.usuarioId,
        roleId: data.roleId,
      },
    });
  }

  /**
   * Elimina un rol de un usuario.
   *
   * @param data Los datos que contienen el ID del usuario y el ID del rol a eliminar.
   * @returns Una promesa que se resuelve cuando el rol se elimina.
   */
  async removeRoleFromUser(data: UsuariosRoles): Promise<void> {
    await prisma.usuariosRoles.delete({
      where: {
        usuarioId_roleId: {
          usuarioId: data.usuarioId,
          roleId: data.roleId,
        },
      },
    });
  }

  /**
   * Obtiene todos los Roles asignados a un usuario.
   *
   * @param usuarioId El ID del usuario para consultar sus Roles.
   * @returns Una lista de Roles asignados al usuario.
   */
  async findRolesByUsuarioId(usuarioId: string): Promise<RoleResponseDto[]> {
    const usuariosRoles = await prisma.usuariosRoles.findMany({
      where: { usuarioId },
      include: {
        Roles: true,
      },
    });

    return usuariosRoles.map((r) => r.Roles);
  }

  /**
   * Verifica si un usuario tiene un rol específico.
   *
   * @param usuarioId El ID del usuario.
   * @param roleId El ID del rol a verificar.
   * @returns El registro de la relación de usuario y rol, o `null` si no existe.
   */
  async findRolesByIds(
    usuarioId: string,
    roleId: string
  ): Promise<UsuariosRoles> {
    const usuariosRoles = await prisma.usuariosRoles.findUnique({
      where: { usuarioId_roleId: { usuarioId, roleId } },
    });

    return usuariosRoles;
  }

  /**
   * Obtiene los nombres de los Roles asignados a un usuario.
   *
   * @param usuarioId El ID del usuario para consultar los nombres de sus Roles.
   * @returns Una lista de los nombres de los Roles asignados al usuario.
   */
  async findRoleNamesByUsuarioId(usuarioId: string): Promise<string[]> {
    const usuariosRoles = await prisma.usuariosRoles.findMany({
      where: { usuarioId },
      include: {
        Roles: true,
      },
    });

    return usuariosRoles.map((r) => r.Roles.name);
  }
}
