package br.ufmsos.estudos.domain.model;

import java.util.UUID;

public record Estudante(
    UUID id,
    String nomeCompleto,
    String matricula,
    String email,
    UUID cursoId,
    Integer semestreAtual,
    Integer anoIngresso,
    Integer semestreIngresso,
    String formaCalculoSemestre
) {}
