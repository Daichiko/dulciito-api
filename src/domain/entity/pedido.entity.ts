import { PedidoPlato } from "./pedido-plato.entity";
import { User } from "./usuario.entity";
import { Cliente } from "./cliente.entity";

export enum OrderStatus {
  CREACION_PEDIDO = "CREACION_PEDIDO",
  ESPERA_DISPONIBILIDAD = "ESPERA_DISPONIBILIDAD",
  CANCELADO_POR_VENDEDOR = "CANCELADO_POR_VENDEDOR",
  PAGO_PENDIENTE = "PAGO_PENDIENTE",
  PROCESANDO = "PROCESANDO",
  ENVIADO = "ENVIADO",
  RECIBIDO = "RECIBIDO",
}

export class Pedido {
  id: string;
  pedidos?: PedidoPlato[];
  usuarioId: string;
  usuario?: User;
  clienteId: string;
  cliente?: Cliente;
  fechaPedido: Date;
  createdAt: Date;
  updatedAt: Date;
}
