import "../ItemLista.css";

const ItemListaAutores = ({ id, nome, sobrenome, data_nascimento, sexo, telefone,descricao, foto, alterarClick, excluirClick }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{nome}</td>
            <td>{sobrenome}</td>
            <td>{data_nascimento}</td>
            <td>{sexo}</td>
            <td>{telefone}</td>
            <td>{descricao}</td>
            <td class="text-center">
                <img src={foto} alt="Foto do Autor" width="75" />
            </td>
            <td class="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                <i className="altera text-success fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
            </td>
        </tr>
    );
};

export default ItemListaAutores;