package br.ufmsos.estagio.application.usecase;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;

public class RegistrarContratoEstagioUseCase {
    private final ContratoEstagioRepository repository;

    public RegistrarContratoEstagioUseCase(final ContratoEstagioRepository repository) {
        this.repository = repository;
    }

    public ContratoEstagio executar(final ContratoEstagio contrato) {
        // Validação de 30h já garantida pelo Record ContratoEstagio
        return repository.salvar(contrato);
    }
}
