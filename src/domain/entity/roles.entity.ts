import { UsuariosRoles } from "./usuarios-roles.entity";

export class Role {
  id: string;
  name: string;
  description?: string | null;
  UserRoles?: UsuariosRoles[];
}
