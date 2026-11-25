// ====== SCRIPT DO GERENCIADOR DE JOGOS ======

// endereço da API (backend Spring Boot)
const API = "/api/jogos";

// pegando os elementos da tela
const listaJogos = document.getElementById("listaJogos");
const modalJogo = document.getElementById("modalJogo");
const formJogo = document.getElementById("formJogo");
const mensagem = document.getElementById("mensagem");
const erroFormulario = document.getElementById("erroFormulario");

// guarda o id do jogo quando estiver alterando (null = cadastrando)
let jogoEmEdicao = null;
let temporizadorMensagem = null;

// ====== EVENTOS ======

document.addEventListener("DOMContentLoaded", carregarJogos);
document.getElementById("novoJogoBtn").addEventListener("click", abrirCadastro);
document.getElementById("fecharModalBtn").addEventListener("click", fecharModal);
document.getElementById("cancelarBtn").addEventListener("click", fecharModal);
document.getElementById("observacoes").addEventListener("input", atualizarContador);
formJogo.addEventListener("submit", salvarJogo);

// ====== LISTAR ======

async function carregarJogos() {
    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os jogos.");
        }

        const jogos = await resposta.json();
        atualizarResumo(jogos);
        mostrarJogos(jogos);

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
        listaJogos.innerHTML = "";
    }
}

// conta quantos jogos estão disponíveis (usando do while)
function atualizarResumo(jogos) {
    let disponiveis = 0;
    let i = 0;

    // so entra no do while se tiver jogo, senão jogos[0] não existe
    if (jogos.length > 0) {
        do {
            if (jogos[i].disponivel === true) {
                disponiveis++;
            }
            i++;
        } while (i < jogos.length);
    }

    document.getElementById("totalJogos").textContent = jogos.length;
    document.getElementById("totalDisponiveis").textContent = disponiveis;
    document.getElementById("totalIndisponiveis").textContent = jogos.length - disponiveis;
}

// monta os cards na tela (usando while e switch)
function mostrarJogos(jogos) {

    // se não tiver nenhum jogo, mostra o aviso
    if (jogos.length === 0) {
        listaJogos.innerHTML = `
            <div class="estado-vazio">
                <h3>Nenhum jogo cadastrado</h3>
                <p>Comece incluindo o primeiro jogo na sua biblioteca.</p>
            </div>`;
        return;
    }

    let html = "";
    let i = 0;

    while (i < jogos.length) {
        const jogo = jogos[i];

        // switch case para escolher o selo do jogo
        let status = "";
        switch (jogo.disponivel) {
            case true:
                status = '<span class="status disponivel">Disponível</span>';
                break;
            default:
                status = '<span class="status indisponivel">INDISPONÍVEL</span>';
        }

        // observação só aparece se tiver texto
        let observacao = "";
        if (jogo.observacoes) {
            observacao = `<div class="observacao">${escaparHTML(jogo.observacoes)}</div>`;
        }

        html += `
            <article class="jogo-card">
                <div class="jogo-topo">
                    <h3>${escaparHTML(jogo.titulo)}</h3>
                    ${status}
                </div>

                <div class="dados-jogo">
                    Ano de lançamento: ${jogo.anoLancamento}<br>
                    Plataforma: ${escaparHTML(jogo.plataforma)}
                </div>

                ${observacao}

                <div class="datas-jogo">
                    <span>Cadastrado em: ${formatarData(jogo.criadoEm)}</span>
                    <span>Última atualização: ${formatarData(jogo.atualizadoEm)}</span>
                </div>

                <div class="acoes-jogo">
                    <button class="botao botao-editar" type="button" onclick="editarJogo(${jogo.id})">Alterar</button>
                    <button class="botao botao-excluir" type="button" onclick="excluirJogo(${jogo.id})">Excluir</button>
                </div>
            </article>`;

        i++;
    }

    listaJogos.innerHTML = html;
}

// ====== CADASTRAR ======

function abrirCadastro() {
    jogoEmEdicao = null;
    formJogo.reset();
    limparErros();

    document.getElementById("tituloModal").textContent = "Incluir novo jogo";
    document.getElementById("salvarBtn").textContent = "Salvar jogo";

    atualizarContador();
    modalJogo.hidden = false;
    document.getElementById("titulo").focus();
}

// ====== ALTERAR (abre o formulário já preenchido) ======

async function editarJogo(id) {
    try {
        const resposta = await fetch(`${API}/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o jogo.");
        }

        const jogo = await resposta.json();

        jogoEmEdicao = id;
        limparErros();

        // preenche os campos com os dados atuais
        document.getElementById("titulo").value = jogo.titulo;
        document.getElementById("anoLancamento").value = jogo.anoLancamento;
        document.getElementById("plataforma").value = jogo.plataforma;
        document.querySelector(`input[name="disponivel"][value="${jogo.disponivel}"]`).checked = true;
        document.getElementById("observacoes").value = jogo.observacoes || "";

        document.getElementById("tituloModal").textContent = `Alterar jogo - ID ${id}`;
        document.getElementById("salvarBtn").textContent = "Salvar alterações";

        atualizarContador();
        modalJogo.hidden = false;

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// ====== SALVAR (serve para cadastrar e para alterar) ======

async function salvarJogo(evento) {
    evento.preventDefault();
    limparErros();

    // pega o que foi digitado
    const disponibilidade = document.querySelector('input[name="disponivel"]:checked');
    const textoAno = document.getElementById("anoLancamento").value;

    const dados = {
        titulo: document.getElementById("titulo").value,
        anoLancamento: textoAno === "" ? null : Number(textoAno),
        plataforma: document.getElementById("plataforma").value,
        disponivel: disponibilidade ? disponibilidade.value === "true" : null,
        observacoes: document.getElementById("observacoes").value
    };

    // guarda antes de fechar o modal, senão o fecharModal apaga o id
    const eraAlteracao = jogoEmEdicao !== null;
    const endereco = eraAlteracao ? `${API}/${jogoEmEdicao}` : API;
    const metodo = eraAlteracao ? "PUT" : "POST";

    try {
        const resposta = await fetch(endereco, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        // deu erro: mostra a mensagem e continua no formulário
        if (!resposta.ok) {
            let erro = {};

            try {
                erro = await resposta.json();
            } catch (e) {
                erro = {};
            }

            mostrarErrosServidor(erro);
            return;
        }

        // deu certo: fecha o formulário, mostra mensagem e atualiza a lista
        fecharModal();
        mostrarMensagem(
            eraAlteracao ? "Jogo atualizado com sucesso!" : "Jogo cadastrado com sucesso!",
            "sucesso"
        );
        await carregarJogos();

    } catch (erro) {
        erroFormulario.textContent = "Não foi possível salvar o jogo. Verifique se o servidor está em execução.";
        erroFormulario.hidden = false;
    }
}

// ====== EXCLUIR ======

async function excluirJogo(id) {
    const confirmar = window.confirm(`Deseja excluir o jogo ID ${id}?`);

    // se clicar em cancelar, só mostra a lista de novo
    if (!confirmar) {
        await carregarJogos();
        return;
    }

    try {
        const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });

        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o jogo.");
        }

        mostrarMensagem("Jogo excluído com sucesso!", "sucesso");
        await carregarJogos();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// ====== FUNÇÕES AUXILIARES ======

function fecharModal() {
    modalJogo.hidden = true;
    formJogo.reset();
    jogoEmEdicao = null;
    limparErros();
    atualizarContador();
}

// mensagem verde (sucesso) ou vermelha (erro) no topo da lista
function mostrarMensagem(texto, tipo) {
    clearTimeout(temporizadorMensagem);

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.hidden = false;

    temporizadorMensagem = setTimeout(() => {
        mensagem.hidden = true;
    }, 5000);
}

// coloca cada erro que veio do Spring embaixo do campo certo (usando switch)
function mostrarErrosServidor(erros) {
    let achouCampo = false;
    const campos = Object.keys(erros);

    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        const texto = erros[campo];

        switch (campo) {
            case "titulo":
                document.getElementById("erroTitulo").textContent = texto;
                achouCampo = true;
                break;
            case "anoLancamento":
                document.getElementById("erroAno").textContent = texto;
                achouCampo = true;
                break;
            case "plataforma":
                document.getElementById("erroPlataforma").textContent = texto;
                achouCampo = true;
                break;
            case "disponivel":
                document.getElementById("erroDisponivel").textContent = texto;
                achouCampo = true;
                break;
            default:
                break;
        }
    }

    // mensagem de erro dentro do formulário
    if (achouCampo) {
        erroFormulario.textContent = "Não foi possível salvar. Corrija os campos indicados.";
    } else {
        erroFormulario.textContent = erros.mensagem || "Verifique os dados informados.";
    }
    erroFormulario.hidden = false;
}

function limparErros() {
    const erros = document.querySelectorAll(".erro-campo");

    for (let i = 0; i < erros.length; i++) {
        erros[i].textContent = "";
    }

    erroFormulario.textContent = "";
    erroFormulario.hidden = true;
}

// contador de caracteres das observações
function atualizarContador() {
    const tamanho = document.getElementById("observacoes").value.length;
    document.getElementById("contadorObservacoes").textContent = `${tamanho}/1000`;
}

// deixa a data no formato do Brasil
function formatarData(valor) {
    if (!valor) {
        return "Não disponível";
    }

    const data = new Date(valor);

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// evita que um texto com < > quebre a página
function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}
