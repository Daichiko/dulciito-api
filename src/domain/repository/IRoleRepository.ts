import { UsuariosRoles } from "../entity/usuarios-roles.entity";
import { Role } from "../entity/roles.entity";

export interface IRoleRepository {
  create(data: Partial<Role>): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  table(
    page: number,
    size: number,
    filter: any
  ): Promise<{
    data: Role[];
    count: number;
  }>;
  assignRoleToUser(data: UsuariosRoles): Promise<UsuariosRoles>;
  removeRoleFromUser(data: UsuariosRoles): Promise<void>;
  findRolesByUsuarioId(userId: string): Promise<Role[]>;
  findRolesByIds(userId: string, roleId: string): Promise<UsuariosRoles>;
  findRoleNamesByUsuarioId(userId: string): Promise<string[]>;
}
