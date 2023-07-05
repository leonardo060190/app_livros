import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { api } from "../config_axios";

const ResumoAutores = () => {
    const [resumo, setResumo] = useState([]);
    const [grafico, setGrafico] = useState([]);

    // Define o método que será executado assim que o componente for renderizado
    useEffect(() => {
        const obterDados = async () => {
            try {
                const dadosResumo = await api.get("/autores/dados/resumo");
                setResumo(dadosResumo.data);

                const dadosGrafico = await api.get("/autores/dados/grafico");
                const arrayGrafico = [["sexo", "*"]];
                dadosGrafico.data.forEach((dado) => {
                    arrayGrafico.push([dado.sexo, dado.grafico]);
                });
                setGrafico(arrayGrafico);
            } catch (error) {
                alert(`Erro: ..Não foi possível obter os dados: ${error}`);
            }
        };

        obterDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <h4 className="mt-3">Resumo</h4>
            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">
                    {(resumo.total)}
                </p>
                <p>total de autores cadastrados</p>
            </span>
            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">
                    {(resumo.sexo)}
                </p>
                <p>autores por sexo </p>
            </span>


            <div className="d-flex justify-content-center">
                <Chart
                    width={'1000px'}
                    height={'420px'}
                    chartType="ColumnChart"
                    loader={<div>Carregando Gráfico...</div>}
                    data={grafico}
                    options={{
                        title: 'Autores por sexo',
                        hAxis: {
                            title: 'Sexo'
                        },
                        vAxis: {
                            title: 'Total de autores cadastrados'
                        }
                    }}
                />
            </div>
        </div>
    );
};//fim da função ResumoLivros



export default ResumoAutores;