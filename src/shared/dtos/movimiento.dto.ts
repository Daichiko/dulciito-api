import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDecimal,
  IsOptional,
  IsString,
} from "class-validator";
import { TipoMovimiento } from "@prisma/client"; // Importa el enum

export class CreateMovimientoDto {
  @IsNotEmpty({ message: "El cuentaId es obligatorio" })
  @IsUUID("4", { message: "El cuentaId debe ser un UUID válido" })
  cuentaId: string;

  @IsNotEmpty({ message: "El tipo de movimiento es obligatorio" })
  @IsEnum(TipoMovimiento, {
    message: "El tipo de movimiento debe ser INGRESO o EGRESO",
  })
  tipoMovimiento: TipoMovimiento;

  @IsNotEmpty({ message: "El monto es obligatorio" })
  @IsDecimal(
    { decimal_digits: "2" },
    { message: "El monto debe ser un número decimal válido" }
  )
  monto: number;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  descripcion?: string;

  @IsOptional()
  @IsUUID("4", { message: "El pedidoId debe ser un UUID válido" })
  pedidoId?: string;

  @IsOptional()
  @IsUUID("4", { message: "El eventoExcepcionalId debe ser un UUID válido" })
  eventoExcepcionalId?: string;
}

export class UpdateMovimientoDto {
  @IsOptional()
  @IsUUID("4", { message: "El cuentaId debe ser un UUID válido" })
  cuentaId?: string;

  @IsOptional()
  @IsEnum(TipoMovimiento, {
    message: "El tipo de movimiento debe ser INGRESO o EGRESO",
  })
  tipoMovimiento?: TipoMovimiento;

  @IsOptional()
  @IsDecimal(
    { decimal_digits: "2" },
    { message: "El monto debe ser un número decimal válido" }
  )
  monto?: number;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  descripcion?: string;

  @IsOptional()
  @IsUUID("4", { message: "El pedidoId debe ser un UUID válido" })
  pedidoId?: string;

  @IsOptional()
  @IsUUID("4", { message: "El eventoExcepcionalId debe ser un UUID válido" })
  eventoExcepcionalId?: string;
}

export class MovimientoResponseDto {
  @IsUUID()
  id: string;
  cuentaId: string;
  tipoMovimiento: TipoMovimiento;
  monto: number;
  fechaMovimiento: Date;
  descripcion?: string | null;
  pedidoId?: string | null;
  eventoExcepcionalId?: string | null;
}
