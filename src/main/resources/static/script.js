const API = "/api/jogos";
const el = id => document.getElementById(id);

const listaJogos = el("listaJogos");
const modalJogo = el("modalJogo");
const formJogo = el("formJogo");
const mensagem = el("mensagem");
const erroFormulario = el("erroFormulario");

let jogoEmEdicao = null;
let temporizadorMensagem;

document.addEventListener("DOMContentLoaded", () => {
    carregarJogos();
    el("novoJogoBtn").onclick = abrirCadastro;
    el("fecharModalBtn").onclick = fecharModal;
    el("cancelarBtn").onclick = fecharModal;
    el("observacoes").oninput = atualizarContador;
    formJogo.onsubmit = salvarJogo;
});

// Lista os jogos
async function carregarJogos() {
    try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error("Erro ao carregar jogos.");

        const jogos = await resposta.json();
        atualizarResumo(jogos);
        mostrarJogos(jogos);
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
        listaJogos.innerHTML = "";
    }
}

// Conta os jogos disponíveis
function atualizarResumo(jogos) {
    let disponiveis = 0, i = 0;

    if (jogos.length > 0) {
        do {
            if (jogos[i].disponivel) disponiveis++;
            i++;
        } while (i < jogos.length);
    }

    el("totalJogos").textContent = jogos.length;
    el("totalDisponiveis").textContent = disponiveis;
    el("totalIndisponiveis").textContent = jogos.length - disponiveis;
}

// Mostra os jogos na tela
function mostrarJogos(jogos) {
    if (jogos.length === 0) {
        listaJogos.innerHTML = `
            <div class="estado-vazio">
                <h3>Nenhum jogo cadastrado</h3>
                <p>Comece incluindo o primeiro jogo na sua biblioteca.</p>
            </div>`;
        return;
    }

    let html = "", i = 0;

    while (i < jogos.length) {
        const jogo = jogos[i];
        let status = "";

        switch (jogo.disponivel) {
            case true:
                status = '<span class="status disponivel">Disponível</span>';
                break;
            default:
                status = '<span class="status indisponivel">INDISPONÍVEL</span>';
        }

        const observacao = jogo.observacoes
            ? `<div class="observacao">${escaparHTML(jogo.observacoes)}</div>`
            : "";

        html += `
            <article class="jogo-card">
                <div class="jogo-topo">
                    <h3>${escaparHTML(jogo.titulo)}</h3>
                    ${status}
                </div>
                <div class="dados-jogo">
                    Ano: ${jogo.anoLancamento}<br>
                    Plataforma: ${escaparHTML(jogo.plataforma)}
                </div>
                ${observacao}
                <div class="datas-jogo">
                    <span>Cadastrado: ${formatarData(jogo.criadoEm)}</span>
                    <span>Atualizado: ${formatarData(jogo.atualizadoEm)}</span>
                </div>
                <div class="acoes-jogo">
                    <button class="botao botao-editar" onclick="editarJogo(${jogo.id})">Alterar</button>
                    <button class="botao botao-excluir" onclick="excluirJogo(${jogo.id})">Excluir</button>
                </div>
            </article>`;

        i++;
    }

    listaJogos.innerHTML = html;
}

// Abre o cadastro
function abrirCadastro() {
    jogoEmEdicao = null;
    formJogo.reset();
    limparErros();

    el("tituloModal").textContent = "Incluir novo jogo";
    el("salvarBtn").textContent = "Salvar jogo";
    atualizarContador();

    modalJogo.hidden = false;
    el("titulo").focus();
}

// Abre o formulário para alteração
async function editarJogo(id) {
    try {
        const resposta = await fetch(`${API}/${id}`);
        if (!resposta.ok) throw new Error("Erro ao consultar jogo.");

        const jogo = await resposta.json();
        jogoEmEdicao = id;

        limparErros();
        el("titulo").value = jogo.titulo;
        el("anoLancamento").value = jogo.anoLancamento;
        el("plataforma").value = jogo.plataforma;
        document.querySelector(`input[name="disponivel"][value="${jogo.disponivel}"]`).checked = true;
        el("observacoes").value = jogo.observacoes || "";

        el("tituloModal").textContent = `Alterar jogo - ID ${id}`;
        el("salvarBtn").textContent = "Salvar alterações";

        atualizarContador();
        modalJogo.hidden = false;
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Cadastra ou altera um jogo
async function salvarJogo(evento) {
    evento.preventDefault();
    limparErros();

    const disponibilidade = document.querySelector('input[name="disponivel"]:checked');
    const ano = el("anoLancamento").value;

    const dados = {
        titulo: el("titulo").value,
        anoLancamento: ano === "" ? null : Number(ano),
        plataforma: el("plataforma").value,
        disponivel: disponibilidade ? disponibilidade.value === "true" : null,
        observacoes: el("observacoes").value
    };

    const alteracao = jogoEmEdicao !== null;

    try {
        const resposta = await fetch(alteracao ? `${API}/${jogoEmEdicao}` : API, {
            method: alteracao ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            mostrarErrosServidor(await resposta.json().catch(() => ({})));
            return;
        }

        fecharModal();
        mostrarMensagem(alteracao ? "Jogo atualizado com sucesso!" : "Jogo cadastrado com sucesso!", "sucesso");
        carregarJogos();
    } catch (erro) {
        erroFormulario.textContent = "Não foi possível salvar. Verifique o servidor.";
        erroFormulario.hidden = false;
    }
}

// Exclui um jogo
async function excluirJogo(id) {
    if (!confirm(`Deseja excluir o jogo ID ${id}?`)) return;

    try {
        const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (!resposta.ok) throw new Error("Erro ao excluir jogo.");

        mostrarMensagem("Jogo excluído com sucesso!", "sucesso");
        carregarJogos();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Fecha o formulário
function fecharModal() {
    modalJogo.hidden = true;
    formJogo.reset();
    jogoEmEdicao = null;
    limparErros();
    atualizarContador();
}

// Mostra mensagens
function mostrarMensagem(texto, tipo) {
    clearTimeout(temporizadorMensagem);
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.hidden = false;

    temporizadorMensagem = setTimeout(() => mensagem.hidden = true, 5000);
}

// Mostra os erros de validação
function mostrarErrosServidor(erros) {
    let achouCampo = false;

    for (const campo of Object.keys(erros)) {
        let idErro = "";

        switch (campo) {
            case "titulo": idErro = "erroTitulo"; break;
            case "anoLancamento": idErro = "erroAno"; break;
            case "plataforma": idErro = "erroPlataforma"; break;
            case "disponivel": idErro = "erroDisponivel"; break;
        }

        if (idErro) {
            el(idErro).textContent = erros[campo];
            achouCampo = true;
        }
    }

    erroFormulario.textContent = achouCampo
        ? "Corrija os campos indicados."
        : erros.mensagem || "Verifique os dados informados.";

    erroFormulario.hidden = false;
}

function limparErros() {
    document.querySelectorAll(".erro-campo").forEach(erro => erro.textContent = "");
    erroFormulario.textContent = "";
    erroFormulario.hidden = true;
}

function atualizarContador() {
    el("contadorObservacoes").textContent = `${el("observacoes").value.length}/1000`;
}

function formatarData(valor) {
    return valor ? new Date(valor).toLocaleString("pt-BR") : "Não disponível";
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[c]);
}
