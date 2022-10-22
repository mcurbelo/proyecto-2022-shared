import axios from "axios"
import { Auth } from ".."

const axiosConfig = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
}

export const agregarTarjeta = (request: CreditCardRequest) : Promise<any> => {
  return axios.post(`http://${Auth.endpoint}/api/usuarios/${request.uuid}/tarjetas`, request, axiosConfig(request.token))
}

export const fetchTarjetas = (request: BasicRequestData) => {
  return axios.get(`http://${Auth.endpoint}/api/usuarios/${request.uuid}/tarjetas`, axiosConfig(request.token))
}


type BasicRequestData = {
  token: string;
  uuid: string;
}
type CreditCardRequest = BasicRequestData & {
  cardNumber: string;
  cardCvv: string;
  cardExpiration: string;
}