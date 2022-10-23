export declare const altaProducto: (datosProducto: DtAltaProducto, imagenes: File[], token: String) => Promise<String>;
export declare const cambiarEstadoProducto: (idUsuario: String, token: String, idProducto: String, nuevoEstado: EstadoProducto) => Promise<String>;
export declare const listarMisProductos: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosMisProductos) => Promise<listados>;
export declare const listarMisVentas: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosVentas) => Promise<listados>;
export declare const gestionarReclamo: (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion) => Promise<String>;
export declare const cambiarEstadoVenta: (idUsuario: String, token: String, idVenta: String, accion: EstadoCompra, info: DtConfirmarCompra) => Promise<String>;
export declare const listarReclamosRecibidos: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo) => Promise<listados>;
export declare type DtConfirmarCompra = {
    fechayHoraRetiro?: string;
    fechayHoraEntrega?: string;
};
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
    fecha?: string;
    nombre?: string;
    categorias?: string[];
    estadoProducto?: EstadoProducto;
};
export declare type DtFiltoReclamo = {
    fecha?: string;
    nombreProducto?: string;
    nombreUsuario?: string;
    tipo?: TipoReclamo;
    resolucion?: TipoResolucion;
};
export declare type DtFiltrosVentas = {
    fecha?: string;
    nombre?: string;
    categorias?: string[];
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
    autor: string;
    idReclamo: string;
};
export declare type DtProductoSlim = {
    idProducto: string;
    nombre: string;
    imagen: string;
    precio: number;
    stock: number;
};
export declare type listados = {
    misProductos?: DtMiProducto;
    ventas?: DtCompraSlimVendedor;
    reclamos?: DtReclamo;
    productos?: DtProductoSlim;
    currentPage: Number;
    totalItems: Number;
    totalPages: Number;
};
export declare enum TipoResolucion {
    Devolucion = "Devolucion",
    PorChat = "PorChat",
    NoResuelto = "PorChat"
}
export declare enum TipoReclamo {
    DesperfectoProducto = "DesperfectoProducto",
    RepticionIncoveniente = "RepticionIncoveniente",
    ProductoNoRecibido = "ProductoNoRecibido",
    ProducoErroneo = "ProducoErroneo",
    Otro = "Otro"
}
export declare enum EstadoProducto {
    Activo = "Activo",
    Pausado = "Pausado",
    BloqueadoADM = "BloqueadoADM"
}
export declare enum EstadoCompra {
    Cancelada = "Cancelada",
    Completada = "Completada",
    Confirmada = "Confirmada",
    EsperandoConfirmacion = "EsperandoConfirmacion"
}
