import { UsuariosRoles } from "./usuarios-roles.entity";
import { Pedido } from "./pedido.entity";

export class Usuario {
  id: string;
  nombre: string;
  correo: string;
  contraseña: string;
  fechaCreacion: Date;
  UserRoles?: UsuariosRoles[];
  pedidosIngresados?: Pedido[];
}

export type UserWithoutPassword = Omit<Usuario, "contraseña">;
