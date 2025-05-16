import { Decimal } from "@prisma/client/runtime/library";
import { Cuenta } from "./cuenta.entity"; // Asegúrate de que la ruta sea correcta
import { Movimiento } from "./movimiento.entity"; // Asegúrate de que la ruta sea correcta
import { TipoEventoExcepcional } from "@prisma/client"; // Importa el enum

export class EventoExcepcional {
  id: string;
  tipoEvento: TipoEventoExcepcional;
  fechaEvento: Date;
  monto: Decimal;
  cuentaOrigenId?: string | null;
  cuentaOrigen?: Cuenta | null;
  cuentaDestinoId?: string | null;
  cuentaDestino?: Cuenta | null;
  referencia?: string | null;
  descripcion?: string | null;
  movimientoId?: string | null;
  movimiento?: Movimiento | null;
}
