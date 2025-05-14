import { Decimal } from "@prisma/client/runtime/library";
import { Receta } from "./receta.entity";

export class Articulo {
  id: string;
  nombre: string;
  descripcion?: string | null;
  cantidad: Decimal;
  tipoMedida: string;
  precio: Decimal;
  recetas?: Receta[];
  createdAt: Date;
  updatedAt: Date;
}
