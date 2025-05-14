import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDecimal()
  cantidad: Decimal;

  @IsString()
  @IsNotEmpty()
  tipoMedida: string;

  @IsDecimal()
  precio: Decimal;
}

export class UpdateArticuloDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDecimal()
  cantidad?: Decimal;

  @IsOptional()
  @IsString()
  tipoMedida?: string;

  @IsOptional()
  @IsDecimal()
  precio?: Decimal;
}

export class ArticuloResponseDto {
  @IsUUID()
  id: string;
  nombre: string;
  descripcion?: string | null;
  cantidad: Decimal;
  tipoMedida: string;
  precio: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
