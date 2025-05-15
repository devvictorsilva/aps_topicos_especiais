import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CadastroCliente from './pages/CadastroCliente'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
