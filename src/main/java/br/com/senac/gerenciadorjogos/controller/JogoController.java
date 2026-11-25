package br.com.senac.gerenciadorjogos.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.com.senac.gerenciadorjogos.dto.JogoRequest;
import br.com.senac.gerenciadorjogos.model.Jogo;
import br.com.senac.gerenciadorjogos.service.JogoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jogos")
public class JogoController {

    private final JogoService service;

    public JogoController(JogoService service) {
        this.service = service;
    }

    // ---- LISTAR TODOS ----
    @GetMapping
    public List<Jogo> listar() {
        return service.listar();
    }

    // ---- BUSCAR UM JOGO (usado na tela de alterar) ----
    @GetMapping("/{id}")
    public Jogo buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // ---- CADASTRAR ----
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Jogo cadastrar(@Valid @RequestBody JogoRequest dados) {
        return service.cadastrar(dados);
    }

    // ---- ALTERAR ----
    @PutMapping("/{id}")
    public Jogo atualizar(@PathVariable Long id, @Valid @RequestBody JogoRequest dados) {
        return service.atualizar(id, dados);
    }

    // ---- EXCLUIR ----
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
