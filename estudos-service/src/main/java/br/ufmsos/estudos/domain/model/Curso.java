package br.ufmsos.estudos.domain.model;

import java.util.UUID;

/**
 * Entidade de Domínio representando um Curso.
 * Mandato: PT-BR e Imutabilidade.
 */
public record Curso(
    UUID id,
    String nome,
    String unidadeAcademica
) {
    public Curso {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome do curso é obrigatório.");
        }
    }
}
