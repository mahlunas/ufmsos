package br.ufmsos.saude.infrastructure.adapter.out.persistence;

import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;
import org.springframework.stereotype.Component;

@Component
public class JpaRegistroBemEstarRepositoryAdapter implements RegistroBemEstarRepository {
    @Override
    public RegistroBemEstar salvar(RegistroBemEstar registro) {
        return registro;
    }
}
