import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDecimal,
  IsOptional,
  IsString,
} from "class-validator";
import { TipoEventoExcepcional } from "@prisma/client"; // Importa el enum

export class CreateEventoExcepcionalDto {
  @IsNotEmpty({ message: "El tipo de evento es obligatorio" })
  @IsEnum(TipoEventoExcepcional, {
    message:
      "El tipo de evento debe ser un valor válido (TRASPASO_INGRESO, TRASPASO_EGRESO, ABONO_EXTERNO, ...)",
  })
  tipoEvento: TipoEventoExcepcional;

  @IsNotEmpty({ message: "El monto es obligatorio" })
  @IsDecimal(
    { decimal_digits: "2" },
    { message: "El monto debe ser un número decimal válido" }
  )
  monto: number;

  @IsOptional()
  @IsUUID("4", { message: "El cuentaOrigenId debe ser un UUID válido" })
  cuentaOrigenId?: string;

  @IsOptional()
  @IsUUID("4", { message: "El cuentaDestinoId debe ser un UUID válido" })
  cuentaDestinoId?: string;

  @IsOptional()
  @IsString({ message: "La referencia debe ser una cadena de texto" })
  referencia?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  descripcion?: string;

  @IsOptional()
  @IsUUID("4", { message: "El movimientoId debe ser un UUID válido" })
  movimientoId?: string;
}

export class UpdateEventoExcepcionalDto {
  @IsOptional()
  @IsEnum(TipoEventoExcepcional, {
    message:
      "El tipo de evento debe ser un valor válido (TRASPASO_INGRESO, TRASPASO_EGRESO, ABONO_EXTERNO, ...)",
  })
  tipoEvento?: TipoEventoExcepcional;

  @IsOptional()
  @IsDecimal(
    { decimal_digits: "2" },
    { message: "El monto debe ser un número decimal válido" }
  )
  monto?: number;

  @IsOptional()
  @IsUUID("4", { message: "El cuentaOrigenId debe ser un UUID válido" })
  cuentaOrigenId?: string;

  @IsOptional()
  @IsUUID("4", { message: "El cuentaDestinoId debe ser un UUID válido" })
  cuentaDestinoId?: string;

  @IsOptional()
  @IsString({ message: "La referencia debe ser una cadena de texto" })
  referencia?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  descripcion?: string;

  @IsOptional()
  @IsUUID("4", { message: "El movimientoId debe ser un UUID válido" })
  movimientoId?: string;
}

export class EventoExcepcionalResponseDto {
  @IsUUID()
  id: string;
  tipoEvento: TipoEventoExcepcional;
  fechaEvento: Date;
  monto: number;
  cuentaOrigenId?: string | null;
  cuentaDestinoId?: string | null;
  referencia?: string | null;
  descripcion?: string | null;
  movimientoId?: string | null;
}
