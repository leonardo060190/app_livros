//Componente para incluir livros no banco de dados
//declaração da função do componente IncluirLivros
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../config_axios";

//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser adicionado no evento onSubmit do form
const IncluirLivros = () => {

    const { register, handleSubmit, reset } = useForm();

    const [aviso, setAviso] = useState("")

    //metodo chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        try {
            const response = await api.post("livros", campos);
            console.log(response);
            setAviso(`Livro cadastrado com sucesso!`);

        } catch (error) {
            console.log(error);
            setAviso(`Erro ... livro não cadastrado! ${error}`);
        }

        //setTimeout: executa o comando após o tempo indicado (em milissegundos)
        setTimeout(() => {
            setAviso("")
        }, 5000);

        //limpa os campos do formulário para uma nova inclusão
        reset({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
        //JSON.stringify() converte um objeto javascript para uma string Json
        //alert(JSON.stringify(campos));
    };

    //form onSubmit ={handleSubmit(salvar)}

    return ( //aqui é o que vai ser exibido na tela
        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão de Livros</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" className="form-control" id="titulo" required autoFocus {...register("titulo")} />
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="autor">Autor</label>
                            <input type="text" className="form-control" id="autor" required {...register("autor")} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Publicação</label>
                            <input type="number" className="form-control" id="ano" required {...register("ano")} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="preco">Preço</label>
                            <input type="number" className="form-control" id="preco" step={0.01} required {...register("preco")} />
                        </div>
                    </div>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="foto">URl da foto:</label>
                    <input type="url" className="form-control" id="foto" required {...register("foto")} />
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

export default IncluirLivros;