package br.ufmsos.rotina.domain.repository;

import br.ufmsos.rotina.domain.model.Habito;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HabitoRepository {
    Habito salvar(Habito habito);
    Optional<Habito> buscarPorId(UUID id);
    List<Habito> listarPorEstudante(UUID estudanteId);
    void excluir(UUID id);
}
