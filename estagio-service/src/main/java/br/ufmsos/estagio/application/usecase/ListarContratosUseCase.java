package br.ufmsos.estagio.application.usecase;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import java.util.List;
import java.util.UUID;

public class ListarContratosUseCase {
    private final ContratoEstagioRepository repository;

    public ListarContratosUseCase(ContratoEstagioRepository repository) {
        this.repository = repository;
    }

    public List<ContratoEstagio> executar(UUID estudanteId) {
        return repository.buscarPorEstudante(estudanteId);
    }
}
