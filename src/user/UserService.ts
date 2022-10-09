import axios from "axios"

export const iniciarSesion = (email: string, password: string) : Promise<IniciarSesionResponse> => {
  return axios.post("http://localhost:8080/api/auth/iniciarSesion", {
    correo: email,
    password: password
  }).then((response) => {
    return {
      success: true,
      token: (response.data['jwt-token'] as string)
    }
  })
  .catch((error) => {
    return {success: false}
  })
}

export const registrarUsuario = (datos: RegistrarUsuarioRequest) : Promise<IniciarSesionResponse> => {
  return axios.post("http://localhost:8080/api/auth/registrarse", datos)
    .then((response) => {
      if(response.data.success) {
        return {
          success: true,
          token: (response.data.token as string)
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
  error?: string;
}