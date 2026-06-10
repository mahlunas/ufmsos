package br.ufmsos.estagio.infrastructure.config;

import br.ufmsos.estagio.application.usecase.RegistrarContratoEstagioUseCase;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public RegistrarContratoEstagioUseCase registrarContratoEstagioUseCase(ContratoEstagioRepository repository) {
        return new RegistrarContratoEstagioUseCase(repository);
    }
}
