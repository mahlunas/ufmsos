package br.ufmsos.estudos.domain.model;

import java.util.UUID;

/**
 * Entidade de Domínio representando uma Disciplina.
 */
public record Disciplina(
    UUID id,
    String nome,
    String codigo,
    Integer cargaHoraria,
    UUID cursoId,
    Integer semestre,
    String preRequisito
) {
    public Disciplina(UUID id, String nome, String codigo, Integer cargaHoraria, UUID cursoId) {
        this(id, nome, codigo, cargaHoraria, cursoId, 1, null);
    }

    public Disciplina {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome da disciplina é obrigatório.");
        }
        if (cargaHoraria != null && cargaHoraria <= 0) {
            throw new IllegalArgumentException("A carga horária deve ser positiva.");
        }
    }
}
