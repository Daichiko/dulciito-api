import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CreateUsuarioDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  nombre: string;

  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  correo: string;

  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  contraseña: string;
}

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  nombre?: string;

  @IsOptional()
  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  correo?: string;

  @IsOptional()
  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  contraseña?: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  correo: string;

  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  contraseña: string;
}

export class ChangePasswordDto {
  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  contraseña: string;
}

export class UsuarioResponseDto {
  @IsUUID()
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: Date;
}
