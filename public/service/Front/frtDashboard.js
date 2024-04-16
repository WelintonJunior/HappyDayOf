let satisfacoes = []
const dashboardServices = new DashboardServices();

document.addEventListener("DOMContentLoaded", async () => {
    const Atendimentos = await dashboardServices.ReadIdAtendimentos(idAcademia);

    const boxChartSatisfacao = document.getElementById('boxChartSatisfacao');
    const chart = new Chart(boxChartSatisfacao, {
        type: 'radar',
        data: [],
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            maintainAspectRatio: false,
            width: 200,
            height: 200
        }
    });
    let somaConhecimento = 0;
    let somaClareza = 0;
    let somaProatividade = 0;
    let somaDisponibilidade = 0;
    let somaSeguranca = 0;
    
    let mediaConhecimento = 0
    let mediaClareza = 0
    let idFuncionario = [];

    for (i = 0; i < Atendimentos.length; i++) {
        const Atendimento = (Atendimentos[i])
        idFuncionario = await dashboardServices.ReadAtendimentos(Atendimento.satIdAtendimento);
        somaConhecimento += parseInt(Atendimento.satNotaConhecimento)
        somaClareza += parseInt(Atendimento.satNotaClareza)

    }

    mediaConhecimento = parseInt(somaConhecimento / Atendimentos.length)
    mediaClareza = parseInt(somaClareza / Atendimentos.length)
    const data = {
        labels: [
            'Conhecimento',
            'Clareza',
            'Pró Atividade',
            'Disponibilidade',
            'Segurança',
        ],
        datasets: [{
            label: idFuncionario.ateIdFuncionario,
            data: [mediaConhecimento, mediaClareza, 0, 0, 0],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };
    chart.data = data

    chart.update()

})