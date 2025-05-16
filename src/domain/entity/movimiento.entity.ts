import { Decimal } from "@prisma/client/runtime/library";
import { Cuenta } from "./cuenta.entity"; // Asegúrate de que la ruta sea correcta
import { Pedido } from "./pedido.entity"; // Asegúrate de que la ruta sea correcta
import { EventoExcepcional } from "./evento-exepcional.entity"; // Asegúrate de que la ruta sea correcta
import { TipoMovimiento } from "@prisma/client"; // Importa el enum

export class Movimiento {
  id: string;
  cuentaId: string;
  cuenta?: Cuenta;
  tipoMovimiento: TipoMovimiento;
  monto: Decimal;
  fechaMovimiento: Date;
  descripcion?: string | null;
  pedidoId?: string | null;
  pedido?: Pedido | null;
  eventoExcepcionalId?: string | null;
  eventoExcepcional?: EventoExcepcional | null;
}
