import axios from "axios"
import { Auth } from ".."

export const iniciarSesion = (email: string, password: string, tokenWeb?: string, tokenMobile?: string): Promise<IniciarSesionResponse> => {
  return axios.post(`http://${Auth.endpoint}/api/auth/iniciarSesion`, {
    correo: email,
    password: password,
    tokenWeb: tokenWeb,
    tokenMobile: tokenMobile
  }).then((response) => {
    return {
      success: true,
      token: (response.data['jwt-token'] as string),
      uuid: (response.data.uuid),
      rol: (response.data.rol)
    }
  })
    .catch((error) => {
      return { success: false }
    })
}

export const registrarUsuario = (datos: RegistrarUsuarioRequest): Promise<IniciarSesionResponse> => {
  return axios.post(`http://${Auth.endpoint}/api/auth/registrarse`, datos)
    .then((response) => {
      if (response.data.success) {
        return {
          success: true,
          token: (response.data.token as string),
          uuid: (response.data.uuid as string),
          rol: (response.data.rol as Rol)
        }
      } else {
        return {
          success: false,
          error: (response.data.errorMessage as string)
        }
      }

    })
    .catch((error) => {
      return { success: false }
    })
}

export const recuperarContrasena = (correo: string): Promise<String> => {
  return axios.put(`http://${Auth.endpoint}/api/auth/recuperarContrasena?correo=${correo}`).then((response) => {
    return response.data;
  })
    .catch((error) => {
      return error.response.data.message;
    })
}

export const reiniciarContrasena = (tokenReset: string, nuevaContrasena: string): Promise<String> => {
  return axios.put(`http://${Auth.endpoint}/api/auth/reiniciarContrasena?token=${tokenReset}`, { contrasena: nuevaContrasena }).then((response) => {
    return response.data;
  })
    .catch((error) => {
      return error.response.data.message;
    })
}

export const verificarCodigo = (tokenReset: string): Promise<String> => {
  return axios.get(`http://${Auth.endpoint}/api/auth/verificarCodigo?codigo=${tokenReset}`).then((response) => {
    return response.data;
  }).catch((error) => {
    return error.response.data.message;
  })
}

export const obtenerInformacion = (token: string, uuid: string): Promise<InfoUsuarioResponse> => {
  return axios.get(`http://${Auth.endpoint}/api/usuarios/` + uuid + `/infoUsuario`).then((response) => {
    return response.data
  })
    .catch((error) => {
      if (error.response.status == 500) {
        return "Error en el servidor";
      } else {
        return error.response.data.message
      }
    })
}


export const updateUser = (token: string, datos: UpdateInfo): Promise<UpdateResponse> => {
  return axios.put(`http://${Auth.endpoint}/api/usuarios/` + datos.uuid + `/infoBasica`,
    {
      "apellido": datos.apellido,
      "correo": datos.correo,
      "nombre": datos.nombre,
      "telefono": datos.telefono,
      "imagen": {
        "data": datos.imagen.data
      }
    })
    .then((response) => {
      return {
        success: true
      }
    })
    .catch((error) => {
      if (error.response.status.toString() === "500") {
        return {
          success: false,
          message: "Error en el servidor"
        }
      } else {
        return {
          success: false,
          message: error.response.data.message
        }
      }
    })
}

export const updateDatosEmpresa = (token: string, idUsuario: string, datos: UpdateInfoEmpresa): Promise<UpdateResponse> => {
  return axios.put(`http://${Auth.endpoint}/api/usuarios/${idUsuario}/perfil`, datos)
    .then((response) => {
      return {
        success: true
      }
    })
    .catch((error) => {
      if (error.response.status.toString() !== "409") {
        return {
          success: false,
          message: "Error en el servidor"
        }
      } else {
        return {
          success: false,
          message: error.response.data.message
        }
      }
    })
}

export const updateContrasena = (token: string, idUsuario: string, datos: DtCambioContrasena): Promise<UpdateResponse> => {
  return axios.put(`http://${Auth.endpoint}/api/usuarios/${idUsuario}/perfil`, datos)
    .then((response) => {
      return {
        success: true
      }
    })
    .catch((error) => {
      if (error.response.status.toString() !== "409") {
        return {
          success: false,
          message: "Error en el servidor"
        }
      } else {
        return {
          success: false,
          message: error.response.data.message
        }
      }
    })
}


export const updateImagen = (token: string, idUsuario: string, imagen: File): Promise<UpdateResponse> => {
  const data = new FormData();
  data.append("imagen", imagen);
  return axios.put(`http://${Auth.endpoint}/api/usuarios/${idUsuario}/perfil/imagen`, data)
    .then((response) => {
      return {
        success: true
      }
    })
    .catch((error) => {
      if (error.response.status.toString() !== "409") {
        return {
          success: false,
          message: "Error en el servidor"
        }
      } else {
        return {
          success: false,
          message: error.response.data.message
        }
      }
    })
}

export const eliminarCuenta = (token: string, idUsuario: string): Promise<UpdateResponse> => {
  return axios.delete(`http://${Auth.endpoint}/api/usuarios/${idUsuario}`)
    .then((response) => {
      return {
        success: true
      }
    })
    .catch((error) => {
      if (error.response.status.toString() !== "409") {
        return {
          success: false,
          message: "Error en el servidor"
        }
      } else {
        return {
          success: false,
          message: error.response.data.message
        }
      }
    })
}


type RegistrarUsuarioRequest = {
  apellido: string;
  correo: string;
  nombre: string;
  password: string;
  telefono: string;
  fechaNac: string;
  tokenWeb?: string;
  tokenMobile?: string
}

type InfoUsuarioResponse = {
  success?: boolean;
  apellido?: string;
  correo?: string;
  nombre?: string;
  telefono?: string;
  rol?: Rol,
  imagen?: {
    data: string,
    nombre: string,
    tamano: number,
    formato: string
  };
  datosVendedor?: DtDatosVendedor;
  calificacion?: number;
}

type IniciarSesionResponse = {
  success: boolean;
  token?: string;
  uuid?: string;
  error?: string;
  rol?: Rol;
}

export type UpdateResponse = {
  success: boolean;
  message?: string;
}

type UpdateInfo = {
  uuid: string,
  correo?: string,
  nombre?: string,
  apellido?: string,
  telefono?: string,
  imagen: {
    data: string,
    nombre?: string,
    tamaño?: 0,
    formato?: string
  }
}

export type DtDatosVendedor = {
  nombreEmpresa: string,
  rut: string,
  telefonoEmpresa: string,
  estadoSolicitud: EstadoSolicitud;
  calificacion: number,
}

export type UpdateInfoEmpresa = {
  nombreEmpresa?: string,
  telefonoEmpresa?: string
}

export type DtCambioContrasena = {
  contrasenaVieja: string,
  contrasenaNueva: string
}

export enum EstadoSolicitud {
  Aceptado = "Aceptado", Pendiente = "Pendiente", NoSolicitada = "NoSolicitada"
}

export enum Rol {
  Vendedor = "Vendedor", ADM = "ADM", Comprador = "Comprador",
}
