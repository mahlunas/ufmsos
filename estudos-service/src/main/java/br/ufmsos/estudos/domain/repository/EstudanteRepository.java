package br.ufmsos.estudos.domain.repository;

import br.ufmsos.estudos.domain.model.Estudante;
import java.util.Optional;
import java.util.UUID;

public interface EstudanteRepository {
    Optional<Estudante> buscarPorId(UUID id);
    void salvar(Estudante estudante);
}
