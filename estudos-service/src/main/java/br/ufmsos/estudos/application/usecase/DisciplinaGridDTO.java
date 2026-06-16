package br.ufmsos.estudos.application.usecase;

import java.util.List;
import java.util.UUID;

public record DisciplinaGridDTO(
    UUID id,
    String nome,
    String codigo,
    Integer cargaHoraria,
    Integer semestre,
    List<String> preRequisitos,
    String status, // "CONCLUIDA", "CURSANDO", "DISPONIVEL", "TRANCADA"
    List<String> materiasTrancando, // list of prerequisite codes that are not completed
    Double nota
) {}
