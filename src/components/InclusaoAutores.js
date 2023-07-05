//Componente para incluir livros no banco de dados
//declaração da função do componente IncluirLivros
import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";
//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser adicionado no evento onSubmit do form
const IncluirAutores = () => {

    const { register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");

    //metodo chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        try {
            const resposta = await api.post("autores/cadastro", campos);
            console.log(resposta)
            setAviso("Autor cadastrado com sucesso!");
        } catch (error) {
            setAviso("Erro ao cadastrar Autor!");
        }

        //limpa os campos do formulário para uma nova inclusão
        // reset({ nome: "", sobrenome: "", data_nascimento: "", sexo: "", telefone: "", descricao: "", foto:"" });
        //JSON.stringify() converte um objeto javascript para uma string Json
        //alert(JSON.stringify(campos));
    };

    //form onSubmit ={handleSubmit(salvar)}

    return ( //aqui é o que vai ser exibido na tela
        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão de Autores</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="row mt-2">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" className="form-control" id="nome" required autoFocus {...register("nome")} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <input type="text" className="form-control" id="autor" required autoFocus {...register("sobrenome")} />
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label htmlFor="sexo">Sexo:</label>
                            <input type="text" className="form-control" id="sexo" required autoFocus {...register("sexo")} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="data_nascimento">Data de Nascimento:</label>
                            <input type="data" className="form-control" id="data_nascimento" required autoFocus {...register("data_nascimento")} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone:</label>
                            <input type="text" className="form-control" id="telefone" required autoFocus {...register("telefone")} />
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <div className="mb-3">
                            <label htmlFor="descricao" class="form-label">Descrição:</label>
                            <textarea className="form-control" id="descricao" rows="4" requiredautoFocus {...register("descricao")}></textarea>
                        </div>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="foto">URL da Foto:</label>
                        <input type="url" className="form-control" id="foto" required  {...register("foto")} />
                    </div>

                </div>
                <input type="submit" className="btn btn-outline-primary mt-3" value="Enviar" />
                <input type="reset" className="btn btn-outline-danger mt-3 ms-3" value="Limpar" />

            </form>
            <div className={aviso.startsWith("OK!") ? "alert alert-success" :
                aviso.startsWith("Erro") ? "alert alert-danger" : ""}> {aviso}
            </div>

        </div>
    );

}

export default IncluirAutores;