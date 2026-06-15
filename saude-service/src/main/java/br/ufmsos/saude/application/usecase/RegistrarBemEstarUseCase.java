package br.ufmsos.saude.application.usecase;

import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;

public class RegistrarBemEstarUseCase {
    private final RegistroBemEstarRepository repository;
    public RegistrarBemEstarUseCase(RegistroBemEstarRepository repository) { this.repository = repository; }
    public RegistroBemEstar executar(RegistroBemEstar registro) { return repository.salvar(registro); }
}
