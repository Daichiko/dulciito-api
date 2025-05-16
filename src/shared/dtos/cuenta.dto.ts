import { IsNotEmpty, IsString, IsUUID, IsOptional } from "class-validator";

export class CreateCuentaDto {
  @IsNotEmpty({ message: "El usuarioId es obligatorio" })
  @IsUUID("4", { message: "El usuarioId debe ser un UUID válido" })
  usuarioId: string;

  @IsNotEmpty({ message: "El número de cuenta es obligatorio" })
  @IsString({ message: "El número de cuenta debe ser una cadena de texto" })
  numeroCuenta: string;

  @IsNotEmpty({ message: "El tipo de cuenta es obligatorio" })
  @IsString({ message: "El tipo de cuenta debe ser una cadena de texto" })
  // @IsEnum(TipoCuenta, { message: "El tipo de cuenta debe ser un valor válido" }) // Descomenta si tienes un enum TipoCuenta
  tipoCuenta: string;

  @IsOptional()
  @IsString({ message: "La moneda debe ser una cadena de texto" })
  moneda?: string;
}

export class UpdateCuentaDto {
  @IsOptional()
  @IsUUID("4", { message: "El usuarioId debe ser un UUID válido" })
  usuarioId?: string;

  @IsOptional()
  @IsString({ message: "El número de cuenta debe ser una cadena de texto" })
  numeroCuenta?: string;

  @IsOptional()
  @IsString({ message: "El tipo de cuenta debe ser una cadena de texto" })
  // @IsEnum(TipoCuenta, { message: "El tipo de cuenta debe ser un valor válido" }) // Descomenta si tienes un enum TipoCuenta
  tipoCuenta?: string;

  @IsOptional()
  @IsString({ message: "La moneda debe ser una cadena de texto" })
  moneda?: string;
}

export class CuentaResponseDto {
  @IsUUID()
  id: string;
  usuarioId: string;
  numeroCuenta: string;
  tipoCuenta: string;
  fechaCreacion: Date;
  saldo: number; // Prisma Decimal se puede representar como number en el response
  moneda: string;
}
