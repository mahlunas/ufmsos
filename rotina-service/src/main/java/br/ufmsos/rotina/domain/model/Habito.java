package br.ufmsos.rotina.domain.model;

import java.util.UUID;

public record Habito(
    UUID id,
    String nome,
    int frequenciaDiaria,
    UUID estudanteId
) {
    public Habito {
        if (nome == null || nome.isBlank()) throw new IllegalArgumentException("Nome do hábito é obrigatório.");
    }
}
