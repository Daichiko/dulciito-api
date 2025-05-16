import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  UsuarioResponseDto,
} from "shared/dtos/usuario.dto";
import { Usuario } from "../entity/usuario.entity";

export interface IUserRepository {
  create(data: CreateUsuarioDto): Promise<UsuarioResponseDto>;
  findByEmail(email: string): Promise<Usuario>;
  findById(id: string): Promise<UsuarioResponseDto>;
  update(id: string, data: UpdateUsuarioDto): Promise<UsuarioResponseDto>;
  delete(id: string): Promise<void>;
  table(
    page: number,
    size: number,
    filter: any
  ): Promise<{
    data: UsuarioResponseDto[];
    count: number;
  }>;
}
