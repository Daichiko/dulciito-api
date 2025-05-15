-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREACION_PEDIDO', 'ESPERA_DISPONIBILIDAD', 'CANCELADO_POR_VENDEDOR', 'PAGO_PENDIENTE', 'PROCESANDO', 'ENVIADO', 'RECIBIDO');

-- CreateTable
CREATE TABLE "Articulos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tipoMedida" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "costoCalculado" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Platos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recetas" (
    "articuloId" TEXT NOT NULL,
    "platoId" TEXT NOT NULL,
    "cantidadUtilizada" DECIMAL(65,30) NOT NULL,
    "unidadMedidaUtilizada" TEXT NOT NULL,

    CONSTRAINT "Recetas_pkey" PRIMARY KEY ("articuloId","platoId")
);

-- CreateTable
CREATE TABLE "Pedidos_platos" (
    "platoId" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,

    CONSTRAINT "Pedidos_platos_pkey" PRIMARY KEY ("platoId","pedidoId")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "fechaPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuariosRoles" (
    "usuarioId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UsuariosRoles_pkey" PRIMARY KEY ("usuarioId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_nombre_key" ON "Clientes"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_correo_key" ON "Clientes"("correo");

-- CreateIndex
CREATE INDEX "Clientes_correo_idx" ON "Clientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_nombre_key" ON "Usuarios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- CreateIndex
CREATE INDEX "Usuarios_correo_idx" ON "Usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- AddForeignKey
ALTER TABLE "Recetas" ADD CONSTRAINT "Recetas_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recetas" ADD CONSTRAINT "Recetas_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "Platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos_platos" ADD CONSTRAINT "Pedidos_platos_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "Platos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos_platos" ADD CONSTRAINT "Pedidos_platos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuariosRoles" ADD CONSTRAINT "UsuariosRoles_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuariosRoles" ADD CONSTRAINT "UsuariosRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
