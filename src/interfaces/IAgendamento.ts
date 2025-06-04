export interface IAgendamentoBody {
  cliente: string;
  tipo_atendimento: 'Prioridade' | 'Agendado' | 'Ordem de Chegada';
  tipoPrioridade?: 'idoso' | 'deficiencia' | 'gestante';
}