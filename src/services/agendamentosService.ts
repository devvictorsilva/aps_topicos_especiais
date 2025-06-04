import type { IAgendamentoBody } from "@/interfaces/IAgendamento";
import axios from "axios";

const agendamentosService = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const getAgendamentos = async () => {
    try {
      const response = await fetch(`${apiURL}agendamento/listar`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching agendamentos:', error);
      throw error;
    }
  };

  const createAgendamento = async (agendamento: IAgendamentoBody) => {
    return await axios.post(`${apiURL}agendamento/criar`, agendamento).then((response) => {
      return response.data;
    })
  }

  const proximoCliente = async (id: string) => {
    return await axios.delete(`${apiURL}agendamento/${id}`).then((response) => {
      return response.data;
    })
  }

  return {
    getAgendamentos,
    createAgendamento,
    proximoCliente,
  }
}

export default agendamentosService;