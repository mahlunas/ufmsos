package br.ufmsos.curriculo.domain.model;

import java.util.List;
import java.util.UUID;

public record Curriculo(
    UUID id,
    String nomeCompleto,
    String objetivo,
    List<String> competencias,
    List<String> experiencias,
    UUID estudanteId
) {
    public Curriculo {
        if (nomeCompleto == null || nomeCompleto.isBlank()) throw new IllegalArgumentException("Nome é obrigatório.");
    }
}
