import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateRecetaDto {
  @IsUUID()
  articuloId: string;

  @IsUUID()
  platoId: string;

  @IsDecimal()
  cantidadUtilizada: Decimal;

  @IsString()
  @IsNotEmpty()
  unidadMedidaUtilizada: string;
}

export class UpdateRecetaDto {
  @IsOptional()
  @IsDecimal()
  cantidadUtilizada?: Decimal;

  @IsOptional()
  @IsString()
  unidadMedidaUtilizada?: string;
}

export class RecetaResponseDto {
  articuloId: string;
  platoId: string;
  cantidadUtilizada: Decimal;
  unidadMedidaUtilizada: string;
}
