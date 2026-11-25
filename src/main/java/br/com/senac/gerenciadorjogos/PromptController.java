package br.com.senac.gerenciadorjogos;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PromptController {

    private static final String INFORMACOES =
            "Classe criada em 2026-11-18 09:43 pelo agente ChatGPT, modelo GPT-6.";

    @GetMapping(value = "/prompt", produces = MediaType.TEXT_PLAIN_VALUE)
    public String consultarPrompt() throws IOException {
        Path caminho = Path.of("PROMPT.md");

        if (Files.exists(caminho)) {
            return Files.readString(caminho, StandardCharsets.UTF_8);
        }

        return INFORMACOES;
    }
}
