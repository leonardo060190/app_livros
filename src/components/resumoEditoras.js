import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { api } from "../config_axios";

const ResumoEditoras = () => {
    const [resumo, setResumo] = useState([]);
    const [grafico, setGrafico] = useState([]);

    // Define o método que será executado assim que o componente for renderizado
    useEffect(() => {
        const obterDados = async () => {
            try {
                const dadosResumo = await api.get("/editoras/dados/resumo");
                setResumo(dadosResumo.data);

                const dadosGrafico = await api.get("/editoras/dados/grafico");
                const arrayGrafico = [["id", "estado"]];
                dadosGrafico.data.forEach((dado) => {
                    arrayGrafico.push([dado.id, dado.estado]);
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
                    {Number(resumo.num)}
                </p>
                <p>N de Editoras Cadastradas</p>
            </span>
            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">
                    {Number(resumo.maior)}
                </p>
                <p>Estado com mais editoras cadastradas</p>
            </span>


            <div className="d-flex justify-content-center">
                
                <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="PieChart"
                    loader={<div>Carregando Gráfico...</div>}
                    data={grafico}
                    options={{
                        title: 'Editoras Cadastradas por Estado',
                        pieHole: 0.4,
                        pieSliceText: 'none',
                        pieStartAngle: 270,
                        pieEndAngle: -90,
                        legend: { position: 'none' },
                        chartArea: { width: '80%', height: '80%' },
                        tooltip: { trigger: 'none' },
                        hAxis: {
                            title: 'Editoras Cadastradas',
                            minValue: 0,
                            maxValue: 100,
                            gridlines: { count: 10 }
                        }  
                    }}
                />
            
            </div>
        </div>
    );
};
//fim da função ResumoEditoras



export default ResumoEditoras;