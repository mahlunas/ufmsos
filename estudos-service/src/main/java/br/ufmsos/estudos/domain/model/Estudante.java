package br.ufmsos.estudos.domain.model;

import java.util.UUID;

public record Estudante(
    UUID id,
    String nomeCompleto,
    String matricula,
    UUID cursoId,
    Integer semestreAtual,
    Integer anoIngresso,
    Integer semestreIngresso,
    String formaCalculoSemestre
) {}
