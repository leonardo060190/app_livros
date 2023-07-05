import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemListaLivros from "./ItemListaLivros";
import { useForm } from "react-hook-form";

const ManutencaoLivros = () => {

    const { register, handleSubmit, reset } = useForm();

    const [livros, setLivros] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("livros");
            setLivros(lista.data);

        } catch (error) {
            alert(`Erro ... Não foi possivel obter os dados!`);
        };
    }
    //define o método uqe será executado assim que o compomente for renderizado
    useEffect(() => {
        obterLista();
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`livros/filtro/${campos.palavra}`);
            lista.data.length
                ? setLivros(lista.data)
                : alert("Não a livros com a palavra-chave pesquisada...");
        } catch (error) {
            alert(`Erro... Não foi possivel obter os dados!`);
        }
    };

    const excluir = async (id, titulo) => {
        if (!window.confirm(`Confirma a exclusão do livro "${titulo}" ? `)) {
            return;
        }
        try {
            await api.delete(`livros/${id}`);
            setLivros(livros.filter((livro) => livro.id !== id));
        } catch (error) {
            alert(`Erro... Não foi possivel excluir este livro "${titulo}"!`);
        }
    }

    const alterar = async (id, titulo, index) => {
        const novoPreco = Number(prompt(`Informe o novo preço do livro: "${titulo}"`));
        if (isNaN(novoPreco) || novoPreco <= 0) {
            return;
        }
        try {
            await api.put(`livros/${id}`, { preco: novoPreco});
            const livrosAtualizado = [...livros]
            livrosAtualizado[index].preco = novoPreco;
            setLivros(livrosAtualizado);
        } catch (error) {
            alert(`Erro... Não foi possivel alterar o preço "${error}"!`);
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic-mt-3">Manutenção</h4>
                </div>


                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Titulo ou Autor" required {...register("palavra")} />
                            <input type="submit" className="btn btn-outline-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-outline-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div >
            </div >

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ano</th>
                        <th>Preço</th>
                        <th>Foto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <ItemListaLivros 
                            key={livro.id}
                            id={livro.id}
                            titulo={livro.titulo}
                            autor={livro.autor}
                            ano={livro.ano}
                            preco={livro.preco}
                            foto={livro.foto}
                            excluirClick={() => excluir (livro.id, livro.titulo)} 
                            alterarClick={() => alterar (livro.id, livro.titulo, index)}/>
                    ))}
                </tbody>
            </table>
        </div >
    );

};

export default ManutencaoLivros;