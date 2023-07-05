import { Link } from "react-router-dom";


const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">Controle Pessoal de Livros</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inclusão de Livros</Link>
          </li>
          <li className="nav-item">
            <Link to="/autores" className="nav-link">Inclusão de Autores</Link>
          </li>
          <li className="nav-item">
            <Link to="/Editoras" className="nav-link">Inclusão de Editoras</Link>
          </li>
          <li className="nav-item">
            <Link to="/manut" className="nav-link">Manutenção de Livros</Link>
          </li>
          <li className="nav-item">
            <Link to="/manut_autores" className="nav-link">Manutenção de Autores</Link>
          </li>
          <li className="nav-item">
            <Link to="/manut_editoras" className="nav-link">Manutenção de Editoras</Link>
          </li>
          <li className="nav-item">
            <Link to="/resumo_livros" className="nav-link">Resumo de Livros</Link>
          </li>
          <li className="nav-item">
            <Link to="/resumo_editoras" className="nav-link">Resumo de Editoras</Link>
          </li>
          <li className="nav-item">
            <Link to="/resumo_autores" className="nav-link">Resumo de Autores</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default MenuSuperior;
