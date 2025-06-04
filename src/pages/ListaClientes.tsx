import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import agendamentosService from '@/services/agendamentosService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Agendamento {
  id: string;
  cliente: string;
  tipo_atendimento: 'Prioridade' | 'Agendado' | 'Ordem de Chegada';
  tipoPrioridade?: 'idoso' | 'deficiencia' | 'gestante';
}

const horariosHoje = [
  { hora: "9:30 AM", duracao: "45 min" },
  { hora: "10:15 AM", duracao: "1hr" },
  { hora: "11:15 AM", duracao: "45 min" },
  { hora: "13:00 PM", duracao: "45 min" },
  { hora: "13:45 PM", duracao: "1 hr" },
];

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Agendamento[]>([]);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    agendamentosService()
      .getAgendamentos()
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar agendamentos:", error);
        toast("Erro ao carregar agendamentos", {
          style: { backgroundColor: "#f44336", color: "white" },
          position: "top-right",
        });
      });
  }

  const handleProximoCliente = () => {
    const cliente = clientes.shift();

    agendamentosService().proximoCliente(cliente!.id).then(() => {
      fetchAgendamentos();
      toast("Atendimento finalizado com sucesso", {
        style: { backgroundColor: "#4caf50", color: "white" },
        position: "top-right",
      });
    })
  };

  return (
    <div className="w-full mx-auto p-4 bg-zinc-900 rounded-lg shadow-md min-h-screen">
      {/* Cabeçalho e busca */}
      <h3 className="text-lg font-semibold text-white mb-2">13 Maio, 2025 <span className="text-zinc-400">Hoje</span></h3>
      <div className="flex items-center gap-2 mb-4">
        <input
          className="flex-1 rounded-md px-3 py-2 bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700"
          placeholder="Busque seu horário"
        />
        <span className="bg-[#A363F0] text-white px-2 py-1 rounded text-xs">{clientes.length}</span>
      </div>
      {/* Agenda de hoje */}
      <div className="space-y-6">
        <div>
          <div className="text-[#A363F0] text-sm mb-2">13 Maio <span className="text-white">Hoje</span></div>
          <div className="space-y-4">
            {horariosHoje.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex flex-col items-end w-20">
                  <span className="text-white text-sm">{h.hora}</span>
                  <span className="text-zinc-400 text-xs">{h.duracao}</span>
                </div>
                <div className={cn(
                  "flex-1 rounded-lg p-4 flex flex-col bg-zinc-800 border border-zinc-700",
                  clientes[i]
                    ? clientes[i].tipo_atendimento === "Prioridade"
                      ? "border-[#A363F0]"
                      : "border-zinc-700"
                    : "border-zinc-700"
                )}>
                  {clientes[i] ? (
                    <>
                      <span className="text-white font-semibold">
                        {clientes[i].cliente}
                        {clientes[i].tipo_atendimento === "Prioridade" && (
                          <span className="ml-2 text-xs text-[#A363F0]">
                            (Prioridade{clientes[i].tipoPrioridade ? `: ${clientes[i].tipoPrioridade}` : ""})
                          </span>
                        )}
                      </span>
                      <span className="text-zinc-400 text-xs mt-1">Barbearia do Zeca</span>
                    </>
                  ) : (
                    <>
                      <span className="text-zinc-400 font-semibold">LIVRE</span>
                      <span className="text-zinc-400 text-xs mt-1">Barbearia do Zeca</span>
                    </>
                  )}
                </div>
                <div className="flex items-center h-full pl-2 pt-2">
                  <span className="text-zinc-400 text-xl">⋮</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Botões */}
      <div className="mt-8 flex flex-col gap-2">
        <Button className="w-full bg-[#A363F0] text-white" onClick={handleProximoCliente} disabled={clientes.length === 0}>
          Próximo cliente
        </Button>
        <Button className="w-full" asChild>
          <Link to={"/"}>
            Voltar
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ListaClientes;