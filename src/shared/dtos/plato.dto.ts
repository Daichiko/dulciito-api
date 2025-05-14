import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Decimal } from "@prisma/client/runtime/library";

export class CreatePlatoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdatePlatoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class PlatoResponseDto {
  @IsUUID()
  id: string;
  nombre: string;
  descripcion?: string | null;
  costoCalculado: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
