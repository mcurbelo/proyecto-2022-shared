export declare const altaProducto: (datosProducto: DtAltaProducto, imagenes: File[], token: String) => Promise<String>;
export declare const cambiarEstadoProducto: (idUsuario: String, idProducto: String, nuevoEstado: EstadoProducto, token: String) => Promise<String>;
export declare const listarMisProductos: (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosMisProductos) => Promise<listados>;
export declare const listarMisVentas: (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosVentas) => Promise<listados>;
export declare const gestionarReclamo: (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion) => Promise<String>;
export declare const listarReclamosRecibidos: (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosVentas) => Promise<listados>;
export declare type DtAltaProducto = {
    emailVendedor: string;
    nombreProducto: string;
    stock: number;
    descripcion: string;
    fechaFin?: string;
    precio: number;
    diasGarantia: number;
    permiteEnvio: boolean;
    categorias: [String];
    esSolicitud: boolean;
};
export declare type DtFiltrosMisProductos = {
    fecha?: Date;
    nombre?: String;
    categorias?: [String];
    EstadoProducto?: EstadoProducto;
};
export declare type DtFiltoReclamo = {
    fecha?: Date;
    nombreProducto?: String;
    nombreUsuario?: String;
    tipo?: TipoReclamo;
    resolucion?: TipoResolucion;
};
export declare type DtFiltrosVentas = {
    fecha?: Date;
    nombre?: String;
    categorias?: [String];
    EstadoCompra?: EstadoCompra;
};
export declare type DtMiProducto = {
    idProducto: String;
    nombre: String;
    imagenes: String;
    fechaInicio: Date;
    fechaFin: Date;
    categorias: [String];
    precio: Number;
    stock: Number;
    estadoProducto: EstadoProducto;
};
export declare type DtCompraSlimVendedor = {
    idCompra: String;
    idComprador: String;
    nombreComprador: String;
    nombreProducto: String;
    cantidad: number;
    fecha: Date;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
};
export declare type DtCompraSlimComprador = {
    idCompra: String;
    idVendedor: String;
    nombreVendedor: String;
    nombreProducto: String;
    cantidad: number;
    fecha: Date;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
};
export declare type DtReclamo = {
    datosCompra: DtCompraSlimComprador;
    tipo: TipoReclamo;
    estado: TipoResolucion;
    fechaRealizado: Date;
    autor: String;
    idReclamo: String;
};
export declare type listados = {
    productos?: DtMiProducto;
    ventas?: DtCompraSlimVendedor;
    reclamos?: DtReclamo;
    currentPage: Number;
    totalItems: Number;
    totalPages: Number;
};
export declare enum TipoResolucion {
    Devolucion = 0,
    PorChat = 1,
    NoResuelto = 2
}
export declare enum TipoReclamo {
    DesperfectoProducto = 0,
    RepticionIncoveniente = 1,
    ProductoNoRecibido = 2,
    ProducoErroneo = 3,
    Otro = 4
}
export declare enum EstadoProducto {
    Activo = 0,
    Pausado = 1,
    BloqueadoADM = 2
}
export declare enum EstadoCompra {
    Cancelada = 0,
    Completada = 1,
    Confirmada = 2,
    EsperandoConfirmacion = 3
}
