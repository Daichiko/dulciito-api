import { User } from "./usuario.entity";
import { Role } from "./roles.entity";

export class UsuariosRoles {
  usuarioId: string;
  usuarios?: User;
  roleId: string;
  Roles?: Role;
}
