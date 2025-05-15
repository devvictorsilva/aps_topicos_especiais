import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useClientes } from '../context/ClientesContext';
import { toast } from "sonner";
import { Icon } from 'lucide-react';

type Atendimento = 'prioridade' | 'horario' | 'chegada';
type TipoPrioridade = 'idoso' | 'deficiencia' | 'gestante' | '';

export function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [atendimento, setAtendimento] = useState<Atendimento>('chegada');
  const [tipoPrioridade, setTipoPrioridade] = useState<TipoPrioridade>('');
  const { adicionarCliente } = useClientes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    const novoCliente = {
      nome,
      atendimento,
      ...(atendimento === 'prioridade' && { tipoPrioridade }),
    };

    adicionarCliente(novoCliente);

    toast("Agendamento realizado com sucesso", {
      style: { backgroundColor: "#4caf50", color: "white" },
      position: "top-right"
    });

    setNome('');
    setAtendimento('chegada');
    setTipoPrioridade('');
  };

  return (
    <div className='flex justify-center'>
      <div>
        <h2 className="text-2xl font-semibold text-[#A363F0] text-center mt-14 mb-6">Agendamento de Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nome" className="mb-2">Nome do Cliente</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="atendimento" className="mb-2">Tipo de Atendimento</Label>
            <Select value={atendimento} onValueChange={(val) => setAtendimento(val as Atendimento)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de Atendimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prioridade">Prioridade</SelectItem>
                <SelectItem value="horario">Agendamento por Horário</SelectItem>
                <SelectItem value="chegada">Ordem de Chegada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {atendimento === 'prioridade' && (
            <div>
              <Label htmlFor="tipoPrioridade" className="mb-2">Tipo de Prioridade</Label>
              <Select
                value={tipoPrioridade}
                onValueChange={(val) => setTipoPrioridade(val as TipoPrioridade)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idoso">Idoso</SelectItem>
                  <SelectItem value="deficiencia">Pessoa com Deficiência</SelectItem>
                  <SelectItem value="gestante">Gestante</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-4">
            <Button type="submit" className="w-full bg-[#A363F0] text-white">
              Cadastrar
            </Button>
          </div>
        </form>

        <Button className='absolute bottom-8 left-8 w-25 h-10 bg-transparent border border-color-[#222222]'>
          <Link to={"/"} className='flex justify-center gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#BBD39D" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z" />
            </svg>
            <span className='text-[#BBD39D] font-bold'>
              Voltar
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default CadastroCliente;