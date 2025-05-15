import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CadastroCliente from './pages/CadastroCliente'
import ListaClientes from './pages/ListaClientes'
import { ClientesProvider } from './context/ClientesContext'
import Home from './pages/Home'

function App() {
  return (
     <ClientesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamento" element={<CadastroCliente />} />
          <Route path="/fila" element={<ListaClientes />} />
        </Routes>
      </BrowserRouter>
     </ClientesProvider>
  )
}

export default App
