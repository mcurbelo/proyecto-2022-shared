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

type IniciarSesionResponse = {
  success: boolean;
  token?: string
}