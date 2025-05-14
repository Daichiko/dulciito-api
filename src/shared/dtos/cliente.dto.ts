import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;
}

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;
}

export class ClienteResponseDto {
  @IsUUID()
  id: string;
  nombre: string;
  correo: string;
  createdAt: Date;
  updatedAt: Date;
}
