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
        this.mediaConhecimento = (this.somaConhecimento / this.count).toFixed(2);
        this.mediaClareza = (this.somaClareza / this.count).toFixed(2);
        this.mediaProatividade = (this.somaProatividade / this.count).toFixed(2);
        this.mediaDisponibilidade = (this.somaDisponibilidade / this.count).toFixed(2);
        this.mediaSeguranca = (this.somaSeguranca / this.count).toFixed(2);
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
        const idFuncionario = atendimento.AteIdFuncionario;
        if (!funcionarios[idFuncionario]) {
            funcionarios[idFuncionario] = {
                nome: await dashboardServices.ReadFuncNome(idFuncionario, token).then(res => res),
                atendimentosPorMes: {}
            };
            colorMap[idFuncionario] = colorMap[idFuncionario] || generateVibrantColor();
        }
    }
    return funcionarios;
}

async function renderSatisfacaoChart() {
    const Satisfacoes = await dashboardServices.ReadSatisfacao(idAcademia, token);
    if (Satisfacoes === null) {
        document.getElementById("NaoPossuiSatisfacao").classList.remove("d-none")
        document.getElementById("boxChartSatisfacao").classList.add("d-none")
        return
    }

    document.getElementById("NaoPossuiSatisfacao").classList.add("d-none")
    document.getElementById("boxChartSatisfacao").classList.remove("d-none")

    let funcionarios = {};

    for (let i = 0; i < Satisfacoes.length; i++) {
        const Satisfacao = Satisfacoes[i];
        const atendimento = await dashboardServices.ReadAtendimentos(Satisfacao.SatIdAtendimento, token);
        const idFuncionario = atendimento.AteIdFuncionario;

        if (!funcionarios[idFuncionario]) {
            funcionarios[idFuncionario] = new DashSatisfacao();
            colorMap[idFuncionario] = colorMap[idFuncionario] || generateVibrantColor();
        }

        let funcionario = funcionarios[idFuncionario];
        funcionario.nome = await dashboardServices.ReadFuncNome(idFuncionario, token);
        funcionario.somaConhecimento += parseInt(Satisfacao.SatNotaConhecimento);
        funcionario.somaClareza += parseInt(Satisfacao.SatNotaClareza);
        funcionario.somaProatividade += parseInt(Satisfacao.SatNotaProatividade);
        funcionario.somaDisponibilidade += parseInt(Satisfacao.SatNotaDisponibilidade);
        funcionario.somaSeguranca += parseInt(Satisfacao.SatNotaSeguranca);
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
                label: `${f.nome}`,
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
    const Atendimentos = await dashboardServices.ReadAllAtendimentos(idAcademia, token);
    const DATA_COUNT = 7;

    if (Atendimentos === null) {
        document.getElementById("NaoPossuiProdutividade").classList.remove("d-none")
        document.getElementById("boxChartProdutividade").classList.add("d-none")
        return
    }

    document.getElementById("NaoPossuiProdutividade").classList.add("d-none")
    document.getElementById("boxChartProdutividade").classList.remove("d-none")

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
        const idFuncionario = atendimento.AteIdFuncionario;
        const date = new Date(atendimento.AteDateInicio);
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
    const Atendimentos = await dashboardServices.ReadAllAtendimentos(idAcademia, token);

    if (Atendimentos === null) {
        document.getElementById("NaoPossuiAtendimento").classList.remove("d-none")
        document.getElementById("boxChartAtendimento").classList.add("d-none")
        return
    }

    document.getElementById("NaoPossuiAtendimento").classList.add("d-none")
    document.getElementById("boxChartAtendimento").classList.remove("d-none")

    let funcionarios = {};
    let funcionarioIds = [];
    const labels = ["Manhã", "Tarde", "Noite"];

    for (let atendimento of Atendimentos) {
        const idFuncionario = atendimento.AteIdFuncionario;
        if (!funcionarios[idFuncionario]) {
            const nome = await dashboardServices.ReadFuncNome(idFuncionario, token);
            funcionarios[idFuncionario] = {
                nome: nome,
                atendimentosPorTurno: { "Manhã": 0, "Tarde": 0, "Noite": 0 }
            };
            funcionarioIds.push(idFuncionario);
        }

        const date = new Date(atendimento.AteDateInicio);
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
    const engajamentos = await dashboardServices.ReadAllEngajamentos(idAcademia, token);
    const DATA_COUNT = 7;

    if (engajamentos === null) {
        document.getElementById("NaoPossuiEngajamento").classList.remove("d-none")
        document.getElementById("boxChartEngajamento").classList.add("d-none")
        return
    }

    document.getElementById("NaoPossuiEngajamento").classList.add("d-none")
    document.getElementById("boxChartEngajamento").classList.remove("d-none")


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
    const countsByMonth = engajamentos.reduce((acc, { EngAccessDatetime }) => {
        const month = new Date(EngAccessDatetime).toISOString().substring(0, 7);
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

async function renderMeuDesempenhoChart() {
    const Satisfacoes = await funServices.FuncionarioMeuDesempenho(dados.FunId, token);
    if (Satisfacoes === null || Satisfacoes.length === 0) {
        document.getElementById("NaoPossuiMeuDesempenho").classList.remove("d-none");
        document.getElementById("boxChartMeuDesempenho").classList.add("d-none");
        return;
    }

    document.getElementById("NaoPossuiMeuDesempenho").classList.add("d-none");
    document.getElementById("boxChartMeuDesempenho").classList.remove("d-none");

    let funcionario = {
        nome: await dashboardServices.ReadFuncNome(dados.FunId, token),
        somaConhecimento: 0,
        somaClareza: 0,
        somaProatividade: 0,
        somaDisponibilidade: 0,
        somaSeguranca: 0,
        count: 0
    };

    Satisfacoes.forEach(Satisfacao => {
        funcionario.somaConhecimento += parseInt(Satisfacao.SatNotaConhecimento);
        funcionario.somaClareza += parseInt(Satisfacao.SatNotaClareza);
        funcionario.somaProatividade += parseInt(Satisfacao.SatNotaProatividade);
        funcionario.somaDisponibilidade += parseInt(Satisfacao.SatNotaDisponibilidade);
        funcionario.somaSeguranca += parseInt(Satisfacao.SatNotaSeguranca);
        funcionario.count++;
    });

    // Calcular médias
    funcionario.mediaConhecimento = funcionario.somaConhecimento / funcionario.count;
    funcionario.mediaClareza = funcionario.somaClareza / funcionario.count;
    funcionario.mediaProatividade = funcionario.somaProatividade / funcionario.count;
    funcionario.mediaDisponibilidade = funcionario.somaDisponibilidade / funcionario.count;
    funcionario.mediaSeguranca = funcionario.somaSeguranca / funcionario.count;

    const labels = ['Conhecimento', 'Clareza', 'Proatividade', 'Disponibilidade', 'Segurança'];
    const data = {
        labels: labels,
        datasets: [{
            label: funcionario.nome,
            data: [funcionario.mediaConhecimento, funcionario.mediaClareza, funcionario.mediaProatividade, funcionario.mediaDisponibilidade, funcionario.mediaSeguranca],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Adjust the color as needed
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    const boxChartMeuDesempenho = document.getElementById('boxChartMeuDesempenho');
    if (boxChartMeuDesempenho.chart) {
        boxChartMeuDesempenho.chart.destroy();
    }
    boxChartMeuDesempenho.chart = new Chart(boxChartMeuDesempenho, {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 5
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

async function renderClienteDesempenhoChart(cliId, token, service) {
    let exercicios = await service.ReadExerciciosForDesempenho(cliId, token);
    const boxChartDesempenho = document.getElementById('boxChartDesempenhoCliente');
    document.getElementById("txtNaoPossui").style.display = "none"
    boxChartDesempenho.style.display = "block"
    if (boxChartDesempenho.chart) {
        boxChartDesempenho.chart.destroy();
    }
    if (exercicios) {
        const exerciciosAgrupadosPorExercicio = {};

        exercicios.forEach(exercicio => {
            const nomeExercicio = exercicio.DetVariacao;
            if (!exerciciosAgrupadosPorExercicio[nomeExercicio]) {
                exerciciosAgrupadosPorExercicio[nomeExercicio] = {
                    label: nomeExercicio,
                    data: [],
                    borderColor: generateVibrantColor(),
                    fill: false,
                    spanGaps: true
                };
            }
            exerciciosAgrupadosPorExercicio[nomeExercicio].data.push({
                x: new Date(exercicio.DetDataAdicionado).toLocaleDateString('pt-BR'),
                y: exercicio.DetCarga
            });
        });

        const datasets = Object.values(exerciciosAgrupadosPorExercicio);

        const ctx = boxChartDesempenho.getContext('2d');
        boxChartDesempenho.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        display: false,
                        offset: false,
                        time: {
                            parser: 'dd/MM/yyyy',
                            tooltipFormat: 'dd/MM/yyyy',
                            unit: 'day',
                            displayFormats: {
                                day: 'dd/MM/yyyy'
                            },
                            minUnit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Data'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Carga'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }

        });
    } else {
        document.getElementById("txtNaoPossui").style.display = "block"
        boxChartDesempenho.style.display = "none"
        if (boxChartDesempenho.chart) {
            boxChartDesempenho.chart.destroy();
        }
    }
}

async function renderNumeracaoChart() {
    const allClientes = await dashboardServices.ReadAllClientes(idAcademia, token)
    const dashNumeracao = document.getElementById("dashNumeracao")
    dashNumeracao.innerHTML = allClientes.IdAcad
}

async function renderEvasaoChart() {
    const evasaoP = await dashboardServices.ReadEvasao(idAcademia, token)
    const dashEvasao = document.getElementById("dashEvasao")
    dashEvasao.innerHTML = evasaoP.toFixed(1) + "%"
}

let reloadBtnSatisfacao = document.getElementById("reloadBtnSatisfacao")
if (reloadBtnSatisfacao) {
    reloadBtnSatisfacao.addEventListener("click", async (e) => {
        e.preventDefault();
        const boxChartSatisfacao = document.getElementById('boxChartSatisfacao');
        boxChartSatisfacao.innerHTML = '';
        await renderSatisfacaoChart();
    });
}

let reloadBtnProdutividade = document.getElementById("reloadBtnProdutividade")
if (reloadBtnProdutividade) {
    reloadBtnProdutividade.addEventListener("click", async (e) => {
        e.preventDefault();
        const boxChartProdutividade = document.getElementById('boxChartProdutividade');
        boxChartProdutividade.innerHTML = '';
        await renderProdutividadeChart();
    });
}

let reloadBtnAtendimento = document.getElementById("reloadBtnAtendimento")
if (reloadBtnAtendimento) {
    reloadBtnAtendimento.addEventListener("click", async (e) => {
        e.preventDefault();
        const boxChartAtendimento = document.getElementById('boxChartAtendimento');
        boxChartAtendimento.innerHTML = '';
        await renderAtendimentoChart();
    });
}

let reloadBtnEngajamento = document.getElementById("reloadBtnEngajamento")
if (reloadBtnEngajamento) {
    reloadBtnEngajamento.addEventListener("click", async (e) => {
        e.preventDefault();
        const boxChartEngajamento = document.getElementById('boxChartEngajamento');
        boxChartEngajamento.innerHTML = '';
        await renderEngajamentoChart();
    });
}

let reloadBtnNumeracao = document.getElementById("reloadBtnNumeracao")
if (reloadBtnNumeracao) {
    reloadBtnNumeracao.addEventListener("click", async (e) => {
        e.preventDefault();
        const dashNumeracao = document.getElementById('dashNumeracao');
        dashNumeracao.innerHTML = '';
        await renderNumeracaoChart();
    });
}

let reloadBtnEvasao = document.getElementById("reloadBtnEvasao")
if (reloadBtnEvasao) {
    reloadBtnEvasao.addEventListener("click", async (e) => {
        e.preventDefault();
        const dashEvasao = document.getElementById('dashEvasao');
        dashEvasao.innerHTML = '';
        await renderEvasaoChart();
    });
}

if (reloadBtnAtendimento) {
    document.addEventListener("DOMContentLoaded", async () => {
        await renderSatisfacaoChart();
        await renderProdutividadeChart();
        await renderAtendimentoChart();
        await renderEngajamentoChart();
        await renderNumeracaoChart();
        await renderEvasaoChart();
    });
}

