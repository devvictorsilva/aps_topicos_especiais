const ListaClientes = () => {
    

    return (
         <div className="mt-6">
        <h3 className="text-xl font-semibold">Clientes Cadastrados</h3>
        <ul className="space-y-2">
          {clientes.map((cliente, index) => (
            <li key={index} className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
              <span>
                <strong>{cliente.nome}</strong>{' '}
                {cliente.atendimento === 'prioridade' && cliente.tipoPrioridade && (
                  <span className="text-sm text-gray-500">({cliente.tipoPrioridade})</span>
                )}
              </span>
              <span
                className={cn(
                  'px-2 py-1 mt-2 sm:mt-0 rounded text-sm',
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
            </li>
          ))}
        </ul>
      </div>
    )
}

export default ListaClientes;