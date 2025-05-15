import { UsuariosRoles } from "../entity/usuarios-roles.entity";
import { CreateRoleDto, RoleResponseDto } from "shared/dtos/roles.dto";

export interface IRoleRepository {
  create(data: CreateRoleDto): Promise<RoleResponseDto>;
  findById(id: string): Promise<RoleResponseDto>;
  findByName(name: string): Promise<RoleResponseDto>;
  findAll(): Promise<RoleResponseDto[]>;
  table(
    page: number,
    size: number,
    filter: any
  ): Promise<{
    data: RoleResponseDto[];
    count: number;
  }>;
  assignRoleToUser(data: UsuariosRoles): Promise<UsuariosRoles>;
  removeRoleFromUser(data: UsuariosRoles): Promise<void>;
  findRolesByUsuarioId(userId: string): Promise<RoleResponseDto[]>;
  findRolesByIds(userId: string, roleId: string): Promise<UsuariosRoles>;
  findRoleNamesByUsuarioId(userId: string): Promise<string[]>;
}
