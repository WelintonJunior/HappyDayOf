let satisfacoes = []
const dashboardServices = new DashboardServices();
class DashSatisfacao {
    constructor() {
        this.somaConhecimento = 0;
        this.somaClareza = 0;
        this.somaProatividade = 0;
        this.somaDisponibilidade = 0;
        this.somaSeguranca = 0;
        this.count = 0;
    }

    calcularMedias() {
        this.mediaConhecimento = this.somaConhecimento / this.count;
        this.mediaClareza = this.somaClareza / this.count;
        this.mediaProatividade = this.somaProatividade / this.count;
        this.mediaDisponibilidade = this.somaDisponibilidade / this.count;
        this.mediaSeguranca = this.somaSeguranca / this.count;
    }
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

async function renderSatisfacaoChart() {
    const Satisfacoes = await dashboardServices.ReadSatisfacao(idAcademia);
    let funcionarios = {};
    let colorMap = {};

    for (let i = 0; i < Satisfacoes.length; i++) {
        const Satisfacao = Satisfacoes[i];
        const atendimento = await dashboardServices.ReadAtendimentos(Satisfacao.satIdAtendimento);
        const idFuncionario = atendimento.ateIdFuncionario;

        if (!funcionarios[idFuncionario]) {
            funcionarios[idFuncionario] = new DashSatisfacao();
            colorMap[idFuncionario] = generateRandomColor();
        }

        let funcionario = funcionarios[idFuncionario];
        funcionario.nome = await dashboardServices.ReadFuncNome(idFuncionario);
        funcionario.somaConhecimento += parseInt(Satisfacao.satNotaConhecimento);
        funcionario.somaClareza += parseInt(Satisfacao.satNotaClareza);
        funcionario.somaProatividade += parseInt(Satisfacao.satNotaProatividade);
        funcionario.somaDisponibilidade += parseInt(Satisfacao.satNotaDisponibilidade);
        funcionario.somaSeguranca += parseInt(Satisfacao.satNotaSeguranca);
        funcionario.count++;
    }
    Object.values(funcionarios).forEach(func => func.calcularMedias());

    const labels = ['Conhecimento', 'Clareza', 'Proatividade', 'Disponibilidade', 'Segurança'];
    const data = {
        labels: labels,
        datasets: Object.keys(funcionarios).map(id => {
            const f = funcionarios[id];
            const color = colorMap[id];
            return {
                label: `${f.nome.funnome}`,
                data: [f.mediaConhecimento, f.mediaClareza, f.mediaProatividade, f.mediaDisponibilidade, f.mediaSeguranca],
                fill: true,
                backgroundColor: color + '20',
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color
            };
        })
    };

    const boxChartSatisfacao = document.getElementById('boxChartSatisfacao');
    if (boxChartSatisfacao.chart) {
        boxChartSatisfacao.chart.destroy();
    }
    boxChartSatisfacao.chart = new Chart(boxChartSatisfacao, {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                r: {
                    min: 1,
                    max: 5,
                    stepSize: 1,
                    beginAtZero: true,
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 5,
                        stepSize: 1
                    }
                }
            }
        },
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderSatisfacaoChart();
});

let reloadBtnSatisfacao = document.getElementById("reloadBtnSatisfacao")
reloadBtnSatisfacao.addEventListener("click", async (e) => {
    e.preventDefault();
    const boxChartSatisfacao = document.getElementById('boxChartSatisfacao');
    boxChartSatisfacao.innerHTML = '';
    await renderSatisfacaoChart();
});
