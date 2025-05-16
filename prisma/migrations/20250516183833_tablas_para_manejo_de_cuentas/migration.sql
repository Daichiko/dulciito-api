-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('INGRESO', 'EGRESO');

-- CreateEnum
CREATE TYPE "TipoEventoExcepcional" AS ENUM ('TRASPASO_INGRESO', 'TRASPASO_EGRESO', 'ABONO_EXTERNO');

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "numeroCuenta" TEXT NOT NULL,
    "tipoCuenta" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "moneda" TEXT NOT NULL DEFAULT 'VES',

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento" (
    "id" TEXT NOT NULL,
    "cuentaId" TEXT NOT NULL,
    "tipoMovimiento" "TipoMovimiento" NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "tasa" DECIMAL(65,30) NOT NULL,
    "fechaMovimiento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT,
    "pedidoId" TEXT,
    "eventoExcepcionalId" TEXT,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoExcepcional" (
    "id" TEXT NOT NULL,
    "tipoEvento" "TipoEventoExcepcional" NOT NULL,
    "fechaEvento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "EventoExcepcional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuenta_numeroCuenta_key" ON "Cuenta"("numeroCuenta");

-- CreateIndex
CREATE UNIQUE INDEX "Movimiento_pedidoId_key" ON "Movimiento"("pedidoId");

-- CreateIndex
CREATE UNIQUE INDEX "Movimiento_eventoExcepcionalId_key" ON "Movimiento"("eventoExcepcionalId");

-- CreateIndex
CREATE INDEX "Movimiento_cuentaId_idx" ON "Movimiento"("cuentaId");

-- CreateIndex
CREATE INDEX "Movimiento_pedidoId_idx" ON "Movimiento"("pedidoId");

-- CreateIndex
CREATE INDEX "Movimiento_eventoExcepcionalId_idx" ON "Movimiento"("eventoExcepcionalId");

-- AddForeignKey
ALTER TABLE "Cuenta" ADD CONSTRAINT "Cuenta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "Cuenta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_eventoExcepcionalId_fkey" FOREIGN KEY ("eventoExcepcionalId") REFERENCES "EventoExcepcional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
