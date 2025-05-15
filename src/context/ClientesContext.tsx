import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Atendimento = 'prioridade' | 'horario' | 'chegada';
type TipoPrioridade = 'idoso' | 'deficiencia' | 'gestante' | '';

export type Cliente = {
  nome: string;
  atendimento: Atendimento;
  tipoPrioridade?: TipoPrioridade;
};

type ClientesContextType = {
  clientes: Cliente[];
  adicionarCliente: (cliente: Cliente) => void;
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

export function useClientes() {
  const context = useContext(ClientesContext);
  if (!context) throw new Error('useClientes deve ser usado dentro de ClientesProvider');
  return context;
}

function getPrioridade(cliente: any) {
  if (cliente.atendimento === 'prioridade') return 1;
  if (cliente.atendimento === 'horario') return 2;
  return 3;
}

export function ClientesProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  function adicionarCliente(cliente: Cliente) {
    setClientes((prev) => {
      const novaFila = [...prev, cliente];
      return novaFila.sort((a, b) => getPrioridade(a) - getPrioridade(b));
    });
  }

  return (
    <ClientesContext.Provider value={{ clientes, adicionarCliente, setClientes }}>
      {children}
    </ClientesContext.Provider>
  );
}