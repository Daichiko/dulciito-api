import { Plato } from "./plato.entity";
import { Pedido } from "./pedido.entity";

export class PedidoPlato {
  platoId: string;
  plato?: Plato;
  pedidoId: string;
  pedido?: Pedido;
}
