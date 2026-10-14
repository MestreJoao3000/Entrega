import { Routes, Route } from "react-router-dom";
import './App.css'
import Cadastro from "./Cadastro";
import RotaPrivada from './Rotaprivada.jsx'
import Login from "./Login";
import Home from "./home.jsx";
import NaoEncontrada from "./NaoEncontrada.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/home" element={
        <RotaPrivada ><Home /></RotaPrivada >
      } />
    </Routes>
  );
}

export default App