package br.ufmsos.estudos.domain.repository;

import br.ufmsos.estudos.domain.model.Revisao;
import java.util.List;
import java.util.UUID;

public interface RevisaoRepository {
    Revisao salvar(Revisao revisao);
    List<Revisao> buscarPorEstudante(UUID estudanteId);
    List<Revisao> buscarPorAvaliacao(UUID avaliacaoId);
}
