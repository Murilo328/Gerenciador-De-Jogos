package br.com.senac.gerenciadorjogos.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// dto: guarda os dados que chegam do formulário e faz a validação
public class JogoRequest {

    @NotBlank(message = "O título é obrigatório.")
    private String titulo;

    @NotNull(message = "O ano de lançamento é obrigatório.")
    @Min(value = 1950, message = "O ano deve ser igual ou maior que 1950.")
    private Integer anoLancamento;

    @NotBlank(message = "A plataforma é obrigatória.")
    private String plataforma;

    @NotNull(message = "Informe se o jogo está disponível.")
    private Boolean disponivel;

    @Size(max = 1000, message = "As observações devem ter no máximo 1000 caracteres.")
    private String observacoes;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getAnoLancamento() {
        return anoLancamento;
    }

    public void setAnoLancamento(Integer anoLancamento) {
        this.anoLancamento = anoLancamento;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }

    public Boolean getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        this.disponivel = disponivel;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}