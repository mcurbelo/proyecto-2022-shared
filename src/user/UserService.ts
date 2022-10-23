import axios from "axios"
import { Auth } from ".."

export const iniciarSesion = (email: string, password: string) : Promise<IniciarSesionResponse> => {
  return axios.post(`http://${Auth.endpoint}/api/auth/iniciarSesion`, {
    correo: email,
    password: password
  }).then((response) => {
    return {
      success: true,
      token: (response.data['jwt-token'] as string),
      uuid: (response.data.uuid)
    }
  })
  .catch((error) => {
    return {success: false}
  })
}

export const registrarUsuario = (datos: RegistrarUsuarioRequest) : Promise<IniciarSesionResponse> => {
  return axios.post(`http://${Auth.endpoint}/api/auth/registrarse`, datos)
    .then((response) => {
      if(response.data.success) {
        return {
          success: true,
          token: (response.data.token as string),
          uuid: (response.data.uuid as string)
        }
      } else {
        return {
          success: false,
          error: (response.data.errorMessage as string)
        }
      }
      
    })
    .catch((error) => {
      return {success: false}
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
  return axios.put(`http://${Auth.endpoint}/api/auth/reiniciarContrasena?token=${tokenReset}&contrasena${nuevaContrasena}`).then((response) => {
      return response.data;
  })
      .catch((error) => {
          return error.response.data.message;
      })
}



type RegistrarUsuarioRequest = {
  apellido: string;
  correo: string;
  fechaNac: string;
  nombre: string;
  password: string;
  telefono: string;
}

type IniciarSesionResponse = {
  success: boolean;
  token?: string;
  uuid?: string;
  error?: string;
}