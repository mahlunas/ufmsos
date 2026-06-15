package br.ufmsos.estudos.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa uma Avaliação (Prova, Trabalho, etc).
 */
public record Avaliacao(
    UUID id,
    String nome,
    LocalDateTime dataPrevista,
    Double notaObtida,
    UUID estudanteId,
    UUID disciplinaId
) {
    public Avaliacao {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome da avaliação é obrigatório.");
        }
        if (notaObtida != null && (notaObtida < 0 || notaObtida > 10)) {
            throw new IllegalArgumentException("A nota deve estar entre 0 e 10.");
        }
    }

    public boolean isPendente() {
        return notaObtida == null;
    }
}
