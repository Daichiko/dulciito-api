import { IsUUID } from "class-validator";

export class CreatePedidoPlatoDto {
  @IsUUID()
  platoId: string;

  @IsUUID()
  pedidoId: string;
}

export class PedidoPlatoResponseDto {
  platoId: string;
  pedidoId: string;
}
