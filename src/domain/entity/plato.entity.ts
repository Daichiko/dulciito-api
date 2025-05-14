import { Decimal } from "@prisma/client/runtime/library";
import { Receta } from "./receta.entity";
import { PedidoPlato } from "./pedido-plato.entity";

export class Plato {
  id: string;
  nombre: string;
  descripcion?: string | null;
  recetas?: Receta[];
  pedidos?: PedidoPlato[];
  costoCalculado: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
