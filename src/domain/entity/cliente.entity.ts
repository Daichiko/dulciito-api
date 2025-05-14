import { Pedido } from "./pedido.entity";

export class Cliente {
  id: string;
  nombre: string;
  correo: string;
  createdAt: Date;
  updatedAt: Date;
  pedidosIngresados?: Pedido[];
}
