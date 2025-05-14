import { IsUUID } from "class-validator";

export class CreatePedidoDto {
  @IsUUID()
  usuarioId: string;

  @IsUUID()
  clienteId: string;
}

export class PedidoResponseDto {
  @IsUUID()
  id: string;
  usuarioId: string;
  clienteId: string;
  fechaPedido: Date;
  createdAt: Date;
  updatedAt: Date;
}
