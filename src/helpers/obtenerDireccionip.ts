import axios from "axios";
import { config } from "../config/config";

const enviroment = config[process.env.NODE_ENV || "desarrollo"];
const ipApiBaseUrl = enviroment.ipApi;
export const obtenerUbicacionPorIp = async (
  ipAddress: string,
  apiBaseUrl: String = ipApiBaseUrl
) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${ipAddress}`);
    if (response.data.status !== "succes") {
      throw new Error("La solicitud no fue exitosa" + response.data.message);
    }
    console.log("respuesta de la Ip", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la ubicacion por Ip", error);
    throw error;
  }
};
