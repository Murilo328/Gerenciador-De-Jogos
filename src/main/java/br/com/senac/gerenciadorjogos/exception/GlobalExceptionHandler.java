package br.com.senac.gerenciadorjogos.exception;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // erro de validação (campo em branco, ano menor que 1950...)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> tratarValidacao(MethodArgumentNotValidException erro) {
        Map<String, String> mensagens = new LinkedHashMap<>();

        erro.getBindingResult().getFieldErrors().forEach(campo ->
                mensagens.put(campo.getField(), campo.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagens);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> tratarJsonInvalido(HttpMessageNotReadableException erro) {
        return montarErro(HttpStatus.BAD_REQUEST, "Os dados enviados são inválidos. Confira o ano de lançamento.");
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> tratarNaoEncontrado(RecursoNaoEncontradoException erro) {
        return montarErro(HttpStatus.NOT_FOUND, erro.getMessage());
    }

    private ResponseEntity<Map<String, String>> montarErro(HttpStatus status, String mensagem) {
        Map<String, String> corpo = new LinkedHashMap<>();
        corpo.put("mensagem", mensagem);
        return ResponseEntity.status(status).body(corpo);
    }
}
