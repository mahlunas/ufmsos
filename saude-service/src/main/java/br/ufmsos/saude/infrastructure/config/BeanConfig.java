package br.ufmsos.saude.infrastructure.config;

import br.ufmsos.saude.application.usecase.AnalisarRiscoSaudeUseCase;
import br.ufmsos.saude.application.usecase.RegistrarBemEstarUseCase;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public RegistrarBemEstarUseCase registrarBemEstarUseCase(RegistroBemEstarRepository repository) {
        return new RegistrarBemEstarUseCase(repository);
    }

    @Bean
    public AnalisarRiscoSaudeUseCase analisarRiscoSaudeUseCase(RegistroBemEstarRepository repository) {
        return new AnalisarRiscoSaudeUseCase(repository);
    }
}
