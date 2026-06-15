package br.ufmsos.financeiro.domain.model;

import java.util.UUID;

/**
 * Representa uma Categoria Financeira (Ex: Alimentação, Bolsa, República).
 */
public record CategoriaFinanceira(
    UUID id,
    String nome,
    String corIcone
) {
    public CategoriaFinanceira {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome da categoria é obrigatório.");
        }
    }
}
