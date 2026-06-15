package br.ufmsos.curriculo.domain.repository;

import br.ufmsos.curriculo.domain.model.Curriculo;
import java.util.Optional;
import java.util.UUID;

public interface CurriculoRepository {
    Curriculo salvar(Curriculo curriculo);
    Optional<Curriculo> buscarPorEstudante(UUID estudanteId);
}
