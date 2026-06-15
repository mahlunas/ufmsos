package br.ufmsos.estagio.domain.model;

import java.time.LocalDate;
import java.util.List;

/**
 * Representa a projeção de recesso (férias) de um estágio.
 */
public record ProjecaoRecesso(
    LocalDate dataSugestao,
    int diasAcumulados,
    String observacao
) {}
