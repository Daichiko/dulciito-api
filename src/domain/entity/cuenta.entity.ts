import { Decimal } from "@prisma/client/runtime/library";
import { Usuario } from "./usuario.entity"; // Asegúrate de que la ruta sea correcta
import { Movimiento } from "./movimiento.entity"; // Asegúrate de que la ruta sea correcta

export class Cuenta {
  id: string;
  usuarioId: string;
  usuario?: Usuario;
  numeroCuenta: string;
  tipoCuenta: string;
  fechaCreacion: Date;
  saldo: Decimal;
  moneda: string;
  movimientos?: Movimiento[];
}
