import { Decimal } from "@prisma/client/runtime/library";
import { Articulo } from "./articulo.entity";
import { Plato } from "./plato.entity";

export class Receta {
  articuloId: string;
  articulo?: Articulo;
  platoId: string;
  plato?: Plato;
  cantidadUtilizada: Decimal;
  unidadMedidaUtilizada: string;
}
