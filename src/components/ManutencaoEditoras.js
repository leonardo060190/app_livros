import { useState, useEffect } from "react";
import { api } from "../config_axios";
import { useForm } from "react-hook-form";
import ItemListaEditoras from "./ItemListaEditoras";

const ManutencaoEditoras = () => {

    const { register, handleSubmit, reset } = useForm();

    const [editoras, setEditoras] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("editoras");
            setEditoras(lista.data);

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
            const lista = await api.get(`editoras/filtro/${campos.palavra}`);
            lista.data.length
                ? setEditoras(lista.data)
                : alert("Não a Editoras com a palavra-chave pesquisada...");
        } catch (error) {
            alert(`Erro... Não foi possivel obter os dados!`);
        }
    };

    const excluir = async (id, nome) => {
        if (!window.confirm(`Confirma a exclusão do editoras: "${nome}" ? `)) {
            return;
        }
        try {
            await api.delete(`editoras/${id}`);
            setEditoras(editoras.filter((editoras) => editoras.id !== id));
        } catch (error) {
            alert(`Erro... Não foi possivel excluir este editoras "${nome}"!`);
        }
    }

    const alterar = async (id, nome, index) => {
        const novoTelefone= (prompt(`Informe o Novo Telefone: "${nome}"`));
        if (isNaN(novoTelefone) || novoTelefone <= 0) {
            return;
        }
        try {
            await api.put(`editoras/${id}`, { telefone: novoTelefone});
            const editorasAtualizado = [...editoras]
            editorasAtualizado[index].telefone = novoTelefone;
            setEditoras(editorasAtualizado);
        } catch (error) {
            alert(`Erro... Não foi possivel fazer as alterações "${error}"!`);
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic-mt-3">Manutenção de Editoras</h4>
                </div>


                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="nome ou telefone" required {...register("palavra")} />
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
                        <th>cidade</th>
                        <th>estado</th>
                        <th>telefone</th>
                        <th>rua</th>
                        <th>cep</th>
                    </tr>
                </thead>
                <tbody>
                    {editoras.map((editoras, index) => (
                        <ItemListaEditoras 
                            key={editoras.id}
                            id={editoras.id}
                            nome={editoras.nome}
                            cidade={editoras.cidade}
                            estado={editoras.estado}
                            telefone={editoras.telefone}
                            rua={editoras.rua}
                            cep={editoras.cep}
                            excluirClick={() => excluir (editoras.id, editoras.nome)} 
                            alterarClick={() => alterar (editoras.id, editoras.nome, index)}/>
                    ))}
                </tbody>
            </table>
        </div >
    );

};

export default ManutencaoEditoras;