import { useState, useEffect } from "react";
import { api } from "../config_axios";
import { useForm } from "react-hook-form";
import ItemListaAutores from "./ItemListaAutores";

const ManutencaoAutores = () => {

    const { register, handleSubmit, reset } = useForm();

    const [autores, setAutores] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("autores");
            setAutores(lista.data);

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
            const lista = await api.get(`Autores/filtro/${campos.palavra}`);
            lista.data.length
                ? setAutores(lista.data)
                : alert("Não a Autores com a palavra-chave pesquisada...");
        } catch (error) {
            alert(`Erro... Não foi possivel obter os dados!`);
        }
    };

    const excluir = async (id, nome) => {
        if (!window.confirm(`Confirma a exclusão do Autores "${nome}" ? `)) {
            return;
        }
        try {
            await api.delete(`autores/${id}`);
            setAutores(autores.filter((autores) => autores.id !== id));
        } catch (error) {
            alert(`Erro... Não foi possivel excluir este Autores "${nome}"!`);
        }
    }

    const alterar = async (id, nome, index) => {
        const novaAlteracao= (prompt(`Informe a alteração "${nome}"`));
        if (isNaN(novaAlteracao) || novaAlteracao <= 0) {
            return;
        }
        try {
            await api.put(`autores/${id}`, { telefone: novaAlteracao, descricao: novaAlteracao, foto: novaAlteracao});
            const autoresAtualizado = [...autores]
            autoresAtualizado[index].telefone.descricao.foto = novaAlteracao;
            setAutores(autoresAtualizado);
        } catch (error) {
            alert(`Erro... Não foi possivel fazer as alterações "${error}"!`);
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic-mt-3">Manutenção de Autores</h4>
                </div>


                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="nome ou sobrenome" required {...register("palavra")} />
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
                        <th>nome</th>
                        <th>sobrenome</th>
                        <th>data_nascimento</th>
                        <th>sexo</th>
                        <th>telefone</th>
                        <th>descricao</th>
                        <th>foto</th>
                    </tr>
                </thead>
                <tbody>
                    {autores.map((autores, index) => (
                        <ItemListaAutores 
                            key={autores.id}
                            id={autores.id}
                            nome={autores.nome}
                            sobrenome={autores.sobrenome}
                            data_nascimento={autores.data_nascimento}
                            sexo={autores.sexo}
                            telefone={autores.telefone}
                            descricao={autores.descricao}
                            foto={autores.foto}
                            excluirClick={() => excluir (autores.id, autores.nome)} 
                            alterarClick={() => alterar (autores.id, autores.nome, index)}/>
                    ))}
                </tbody>
            </table>
        </div >
    );

};

export default ManutencaoAutores;