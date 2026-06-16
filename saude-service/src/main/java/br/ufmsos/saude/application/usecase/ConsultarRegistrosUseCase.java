package br.ufmsos.saude.application.usecase;

import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;
import java.util.List;
import java.util.UUID;

public class ConsultarRegistrosUseCase {
    private final RegistroBemEstarRepository repository;

    public ConsultarRegistrosUseCase(RegistroBemEstarRepository repository) {
        this.repository = repository;
    }

    public List<RegistroBemEstar> executar(UUID estudanteId) {
        return repository.buscarUltimosPorEstudante(estudanteId, 10);
    }
}
