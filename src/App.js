import './App.css';
import { Routes, Route } from 'react-router-dom';
import MenuSuperior from './components/MenuSuperior';
import InclusaoLivros from './components/InclusaoLivros';
import ManutencaoLivros from './components/ManutencaoLivros';
import ResumoLivros from './components/ResumoLivros';
import IncluirAutores from './components/InclusaoAutores';
import ManutencaoAutores from './components/ManutencaoAutores';
import ResumoAutores from './components/resumoAutores';
import IncluirEditoras from './components/InclusaoEditoras';
import ManutencaoEditoras from './components/ManutencaoEditoras';
import ResumoEditoras from './components/resumoEditoras';



const App = () => {
  return (
    <>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<InclusaoLivros />} />
        <Route path="/autores" element={<IncluirAutores />} />
        <Route path="/editoras" element={<IncluirEditoras />} />
        <Route path="/manut" element={<ManutencaoLivros />} />
        <Route path="/manut_autores" element={<ManutencaoAutores />} />        
        <Route path="/manut_editoras" element={<ManutencaoEditoras />} />
        <Route path="/resumo_livros" element={<ResumoLivros />} />
        <Route path="/resumo_editoras" element={<ResumoEditoras />} />
        <Route path="/resumo_autores" element={<ResumoAutores />} />
      </Routes>
    </>

  );
}

export default App;
