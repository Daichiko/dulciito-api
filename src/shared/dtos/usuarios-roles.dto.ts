import { IsUUID } from "class-validator";

export class CreateUsuarioRolDto {
  @IsUUID()
  usuarioId: string;

  @IsUUID()
  roleId: string;
}

export class UsuarioRolResponseDto {
  usuarioId: string;
  roleId: string;
}
