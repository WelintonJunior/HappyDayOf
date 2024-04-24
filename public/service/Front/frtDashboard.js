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

let vibrantColors = [
    "#e6194b", "#000075", "#ffe119", "#4363d8", "#f58231",
    "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
    "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
    "#aaffc3", "#808000", "#ffd8b1", "#3cb44b", "#808080"
];

let colorIndex = 0;

function generateVibrantColor() {
    let color = vibrantColors[colorIndex];
    colorIndex = (colorIndex + 1) % vibrantColors.length;
    return color;
}

function getTurno(date) {
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return 'Manhã';
    } else if (hours >= 12 && hours < 18) {
        return 'Tarde';
    } else {
        return 'Noite';
    }
}

let colorMap = {};

async function fetchAndMapFuncionarios(Atendimentos) {
    let funcionarios = {};
    for (let i = 0; i < Atendimentos.length; i++) {
        const atendimento = Atendimentos[i];
        const idFuncionario = atendimento.ateIdFuncionario;
        if (!funcionarios[idFuncionario]) {
            funcionarios[idFuncionario] = {
                nome: await dashboardServices.ReadFuncNome(idFuncionario).then(res => res.funnome),
                atendimentosPorMes: {}
            };
            colorMap[idFuncionario] = colorMap[idFuncionario] || generateVibrantColor();
        }
    }
    return funcionarios;
}

async function renderSatisfacaoChart() {
    const Satisfacoes = await dashboardServices.ReadSatisfacao(idAcademia);
    let funcionarios = {};

    for (let i = 0; i < Satisfacoes.length; i++) {
        const Satisfacao = Satisfacoes[i];
        const atendimento = await dashboardServices.ReadAtendimentos(Satisfacao.satIdAtendimento);
        const idFuncionario = atendimento.ateIdFuncionario;

        if (!funcionarios[idFuncionario]) {
            funcionarios[idFuncionario] = new DashSatisfacao();
            colorMap[idFuncionario] = colorMap[idFuncionario] || generateVibrantColor();
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

async function renderProdutividadeChart() {
    const Atendimentos = await dashboardServices.ReadAllAtendimentos(idAcademia);
    const DATA_COUNT = 7;

    function generateLastMonths(count) {
        let months = [];
        let date = new Date();
        date.setDate(1);
        for (let i = 0; i < count; i++) {
            months.unshift(date.toISOString().slice(0, 7));
            date.setMonth(date.getMonth() - 1);
        }
        return months;
    }

    const labels = generateLastMonths(DATA_COUNT);
    let funcionarios = await fetchAndMapFuncionarios(Atendimentos);

    for (let i = 0; i < Atendimentos.length; i++) {
        const atendimento = Atendimentos[i];
        const idFuncionario = atendimento.ateIdFuncionario;
        const date = new Date(atendimento.ateDateInicio);
        const monthYear = date.toISOString().slice(0, 7);

        if (!funcionarios[idFuncionario].atendimentosPorMes[monthYear]) {
            funcionarios[idFuncionario].atendimentosPorMes[monthYear] = 0;
        }
        funcionarios[idFuncionario].atendimentosPorMes[monthYear]++;
    }

    const datasets = Object.keys(funcionarios).map(id => {
        const funcionario = funcionarios[id];
        return {
            label: funcionario.nome,
            data: labels.map(month => funcionario.atendimentosPorMes[month] || 0),
            backgroundColor: colorMap[id],
            borderColor: colorMap[id]
        };
    });

    const boxChartProdutividade = document.getElementById('boxChartProdutividade');
    if (boxChartProdutividade.chart) {
        boxChartProdutividade.chart.destroy();
    }
    boxChartProdutividade.chart = new Chart(boxChartProdutividade, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
        }
    });
}

async function renderAtendimentoChart() {
    const Atendimentos = await dashboardServices.ReadAllAtendimentos(idAcademia);
    let funcionarios = {};
    let funcionarioIds = [];
    const labels = ["Manhã", "Tarde", "Noite"];

    for (let atendimento of Atendimentos) {
        const idFuncionario = atendimento.ateIdFuncionario;
        if (!funcionarios[idFuncionario]) {
            const nome = await dashboardServices.ReadFuncNome(idFuncionario);
            funcionarios[idFuncionario] = {
                nome: nome.funnome,
                atendimentosPorTurno: { "Manhã": 0, "Tarde": 0, "Noite": 0 }
            };
            funcionarioIds.push(idFuncionario);
        }

        const date = new Date(atendimento.ateDateInicio);
        const turno = getTurno(date);
        funcionarios[idFuncionario].atendimentosPorTurno[turno]++;
    }

    const datasets = funcionarioIds.map(id => {
        const funcionario = funcionarios[id];
        return {
            label: funcionario.nome,
            data: [funcionario.atendimentosPorTurno["Manhã"], funcionario.atendimentosPorTurno["Tarde"], funcionario.atendimentosPorTurno["Noite"]],
            backgroundColor: colorMap[id]
        };
    });

    const boxChartAtendimento = document.getElementById('boxChartAtendimento');
    if (boxChartAtendimento.chart) {
        boxChartAtendimento.chart.destroy();
    }
    boxChartAtendimento.chart = new Chart(boxChartAtendimento, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
        }
    });
}

async function renderEngajamentoChart() {
    const engajamentos = await dashboardServices.ReadAllEngajamentos(idAcademia);
    const DATA_COUNT = 7;

    function generateLastMonths(count) {
        let months = [];
        let date = new Date();
        date.setDate(1);
        for (let i = 0; i < count; i++) {
            months.unshift(date.toISOString().slice(0, 7));
            date.setMonth(date.getMonth() - 1);
        }
        return months;
    }

    const labels = generateLastMonths(DATA_COUNT);

    const countsByMonth = engajamentos.reduce((acc, { engAccessDatetime }) => {
        const month = new Date(engAccessDatetime).toISOString().substring(0, 7); 
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const data = labels.map(label => countsByMonth[label]);

    const boxChartEngajamento = document.getElementById('boxChartEngajamento');
    if (boxChartEngajamento.chart) {
        boxChartEngajamento.chart.destroy();
    }

    boxChartEngajamento.chart = new Chart(boxChartEngajamento, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Acessos por Mês',
                data: data,
                fill: false,
                borderColor: '#e6194b',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



let reloadBtnSatisfacao = document.getElementById("reloadBtnSatisfacao")
reloadBtnSatisfacao.addEventListener("click", async (e) => {
    e.preventDefault();
    const boxChartSatisfacao = document.getElementById('boxChartSatisfacao');
    boxChartSatisfacao.innerHTML = '';
    await renderSatisfacaoChart();
});

let reloadBtnProdutividade = document.getElementById("reloadBtnProdutividade")
reloadBtnProdutividade.addEventListener("click", async (e) => {
    e.preventDefault();
    const boxChartProdutividade = document.getElementById('boxChartProdutividade');
    boxChartProdutividade.innerHTML = '';
    await renderProdutividadeChart();
});

let reloadBtnAtendimento = document.getElementById("reloadBtnAtendimento")
reloadBtnAtendimento.addEventListener("click", async (e) => {
    e.preventDefault();
    const boxChartAtendimento = document.getElementById('boxChartAtendimento');
    boxChartAtendimento.innerHTML = '';
    await renderAtendimentoChart();
});

let reloadBtnEngajamento = document.getElementById("reloadBtnEngajamento")
reloadBtnEngajamento.addEventListener("click", async (e) => {
    e.preventDefault();
    const boxChartEngajamento = document.getElementById('boxChartEngajamento');
    boxChartEngajamento.innerHTML = '';
    await renderEngajamentoChart();
});

document.addEventListener("DOMContentLoaded", async () => {
    await renderSatisfacaoChart();
    await renderProdutividadeChart();
    await renderAtendimentoChart();
    await renderEngajamentoChart();
});

