import { UsuariosRoles } from "./usuarios-roles.entity";
import { Pedido } from "./pedido.entity";

export class User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  fechaCreacion: Date;
  UserRoles?: UsuariosRoles[];
  pedidosIngresados?: Pedido[];
}

export type UserWithoutPassword = Omit<User, "password">;
