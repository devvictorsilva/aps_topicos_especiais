import { cn } from '@/lib/utils';
import { useClientes } from '../context/ClientesContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ListaClientes = () => {
  const { clientes, setClientes } = useClientes();

  const handleProximoCliente = () => {
    if (clientes.length > 0) {
      setClientes((prev: any) => prev.slice(1));
      toast("Atendimento finalizado com sucesso", {
        style: {backgroundColor: "#4caf50", color: "white"},
        position: "top-right"
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold">Clientes Cadastrados</h3>
      {clientes.length === 0 ? (
        <div className="text-center text-gray-500 my-8">
          Nenhum cliente cadastrado ainda.
        </div>
      ) : (
        <ul className="space-y-2 overflow-x-auto">
          {clientes.map((cliente, index) => (
            <div
              key={index}
              className="flex justify-between items-center min-w-[270px] whitespace-nowrap"
              style={{ overflowX: 'auto' }}
            >
              <span className="truncate max-w-[170px]">
                <strong>{cliente.nome}</strong>{' '}
                {cliente.atendimento === 'prioridade' && cliente.tipoPrioridade && (
                  <span className="text-sm text-gray-500">(Prioridade: {cliente.tipoPrioridade})</span>
                )}
              </span>
              <span
                className={cn(
                  'px-2 py-1 rounded text-sm whitespace-nowrap',
                  cliente.atendimento === 'prioridade'
                    ? 'bg-red-500 text-white'
                    : cliente.atendimento === 'horario'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'
                )}
              >
                {cliente.atendimento === 'prioridade'
                  ? 'Prioridade'
                  : cliente.atendimento === 'horario'
                  ? 'Agendamento'
                  : 'Chegada'}
              </span>
            </div>
          ))}
        </ul>
      )}
      <Button className="w-full" onClick={handleProximoCliente} disabled={clientes.length === 0}>
        Próximo cliente
      </Button>
      <Button className="w-full" variant={'outline'} asChild>
        <Link to={"/"}>
          Voltar
        </Link>
      </Button>
    </div>
  );
};

export default ListaClientes;