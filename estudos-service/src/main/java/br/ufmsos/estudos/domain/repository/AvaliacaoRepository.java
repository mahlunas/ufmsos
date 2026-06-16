package br.ufmsos.estudos.domain.repository;

import br.ufmsos.estudos.domain.model.Avaliacao;
import java.util.List;
import java.util.UUID;

public interface AvaliacaoRepository {
    Avaliacao salvar(Avaliacao avaliacao);
    java.util.Optional<Avaliacao> buscarPorId(UUID id);
    List<Avaliacao> buscarPorEstudanteEDisciplina(UUID estudanteId, UUID disciplinaId);
    List<Avaliacao> buscarTodas();
}
