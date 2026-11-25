package br.com.senac.gerenciadorjogos.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.senac.gerenciadorjogos.dto.JogoRequest;
import br.com.senac.gerenciadorjogos.exception.RecursoNaoEncontradoException;
import br.com.senac.gerenciadorjogos.model.Jogo;
import br.com.senac.gerenciadorjogos.repository.JogoRepository;

@Service
public class JogoService {

    private final JogoRepository repository;

    public JogoService(JogoRepository repository) {
        this.repository = repository;
    }

    // ---- LISTAR ----
    public List<Jogo> listar() {
        return repository.findAll();
    }

    // ---- BUSCAR POR ID ----
    public Jogo buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Jogo não encontrado: " + id));
    }

    // ---- CADASTRAR ----
    @Transactional
    public Jogo cadastrar(JogoRequest dados) {
        Jogo jogo = new Jogo();
        preencherJogo(jogo, dados);
        return repository.save(jogo);
    }

    // ---- ALTERAR ----
    @Transactional
    public Jogo atualizar(Long id, JogoRequest dados) {
        Jogo jogo = buscarPorId(id);
        preencherJogo(jogo, dados);
        return repository.save(jogo);
    }

    // ---- EXCLUIR ----
    @Transactional
    public void excluir(Long id) {
        Jogo jogo = buscarPorId(id);
        repository.delete(jogo);
    }

    // ---- COPIA OS DADOS DO FORMULÁRIO PARA O JOGO ----
    private void preencherJogo(Jogo jogo, JogoRequest dados) {
        jogo.setTitulo(limparEspacos(dados.getTitulo()));
        jogo.setAnoLancamento(dados.getAnoLancamento());
        jogo.setPlataforma(padronizarPlataforma(dados.getPlataforma()));
        jogo.setDisponivel(dados.getDisponivel());
        jogo.setObservacoes(dados.getObservacoes());
    }

    // ---- TIRA OS ESPAÇOS DUPLOS DO TEXTO ----
    public static String limparEspacos(String texto) {
        texto = texto.trim();

        do {
            texto = texto.replace("  ", " ");
        } while (texto.contains("  "));

        return texto;
    }

    // ---- DEIXA O NOME DA PLATAFORMA PADRONIZADO ----
    public static String padronizarPlataforma(String plataforma) {
        String limpa = limparEspacos(plataforma);

        // switch case: compara o texto com as plataformas mais comuns
        switch (limpa.toLowerCase()) {
            case "ps5":
                return "PS5";
            case "ps4":
                return "PS4";
            case "xbox":
                return "Xbox";
            case "pc":
                return "PC";
            case "switch":
                return "Switch";
            default:
                return limpa;
        }
    }
}
