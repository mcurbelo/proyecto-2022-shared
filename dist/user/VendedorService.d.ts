import { UpdateResponse } from "./UserService";
export declare const altaProducto: (datosProducto: DtAltaProducto, imagenes: File[], token: String) => Promise<String>;
export declare const cambiarEstadoProducto: (idUsuario: String, token: String, idProducto: String, nuevoEstado: EstadoProducto) => Promise<String>;
export declare const listarMisProductos: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosMisProductos) => Promise<listados>;
export declare const listarMisVentas: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosVentas) => Promise<listados>;
export declare const gestionarReclamo: (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion) => Promise<String>;
export declare const cambiarEstadoVenta: (idUsuario: String, token: String, idVenta: String, accion: EstadoCompra, info: DtConfirmarCompra) => Promise<String>;
export declare const completarVentaRetiro: (idUsuario: String, token: String, idVenta: String) => Promise<String>;
export declare const listarReclamosRecibidos: (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo) => Promise<listados>;
export declare const modificarProducto: (idUsuario: String, token: String, idProducto: string, datos: DtModificarProducto, imagenes: File[]) => Promise<UpdateResponse>;
export declare type DtConfirmarCompra = {
    fechayHoraRetiro?: string;
    fechayHoraEntrega?: string;
    motivo?: string;
};
export declare type DtAltaProducto = {
    nombreProducto: string;
    stock: number;
    descripcion: string;
    fechaFin?: string;
    precio: number;
    diasGarantia: number;
    permiteEnvio: boolean;
    categorias: string[];
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
    estado?: EstadoCompra;
};
export declare type DtMiProducto = {
    idProducto: string;
    nombre: string;
    imagenes: string[];
    fechaInicio: string;
    fechaFin: string;
    categorias: string[];
    precio: number;
    stock: number;
    estado: EstadoProducto;
    descripcion: string;
    permiteEnvio: boolean;
};
export declare type DtCompraSlimVendedor = {
    idVenta: string;
    idComprador: string;
    nombreComprador: string;
    nombreProducto: string;
    cantidad: number;
    fecha: Date;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
    imagenURL: string;
    fechaEntrega?: string;
    puedeCalificar: boolean;
    puedeCompletar: boolean;
    esEnvio: boolean;
    direccionEntrega: string;
    calificacionComprador: number;
};
export declare type DtCompraSlimComprador = {
    idCompra: string;
    idVendedor: string;
    nombreVendedor: string;
    nombreProducto: string;
    cantidad: number;
    fecha: Date;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
    imagenURL: string;
    esEnvio: boolean;
    puedeCompletar: boolean;
    puedeCalificar: boolean;
    puedeReclamar: boolean;
    fechaEntrega?: Date;
    direccionEntrega: string;
    garantiaActiva: boolean;
};
export declare type DtReclamo = {
    datosCompra: DtInfoCompra;
    tipo: TipoReclamo;
    estado: TipoResolucion;
    fechaRealizado: Date;
    autor: string;
    idReclamo: string;
    descripcion: string;
};
export declare type DtProductoSlim = {
    idProducto: string;
    nombre: string;
    imagen: string;
    precio: number;
    stock: number;
    permiteEnvio: boolean;
};
export declare type listados = {
    misProductos?: DtMiProducto[];
    ventas?: DtCompraSlimVendedor[];
    reclamos?: DtReclamo[];
    productos?: DtProductoSlim[];
    compras?: DtCompraSlimComprador[];
    usuarios?: DtUsuarioSlim[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
};
export declare type DtInfoCompra = {
    idCompra: string;
    idVendedor: string;
    nombreVendedor: string;
    nombreProducto: string;
    cantidad: number;
    fecha: Date;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
    fechaEntrega: string;
    direccionEntrega: string;
    esEnvio: boolean;
    avatarVendedor: string;
    avatarComprador: string;
    imagenProducto: string;
};
export declare type DtUsuarioSlim = {
    id: string;
    correo: string;
    nombre: string;
    apellido: string;
    estadoUsuario: string;
};
export declare type DtModificarProducto = {
    descripcion?: string;
    fechaFin?: string;
    precio?: number;
    stock?: number;
    imagenesQuitar?: number[];
    permiteEnvio?: boolean;
};
export declare enum TipoResolucion {
    Devolucion = "Devolucion",
    PorChat = "PorChat",
    NoResuelto = "NoResuelto"
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
    EsperandoConfirmacion = "EsperandoConfirmacion",
    Devolucion = "Devolucion"
}
