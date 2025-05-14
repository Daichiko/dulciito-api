import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class RoleResponseDto {
  @IsUUID()
  id: string;
  name: string;
  description?: string | null;
}
