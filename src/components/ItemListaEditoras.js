import "../ItemLista.css";

const ItemListaEditoras = ({id, nome, cidade, estado, telefone, rua, cep, alterarClick, excluirClick}) => {
    return ( 
    <tr>
        <td>{id}</td>
        <td>{nome}</td>
        <td>{cidade}</td>
        <td>{estado}</td>
        <td>{telefone}</td>
        <td>{rua}</td>
        <td>{cep}</td>
        <td class="text-center">
            <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
            <i className="altera text-success fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
        </td>
    </tr>
    );
};

export default ItemListaEditoras;