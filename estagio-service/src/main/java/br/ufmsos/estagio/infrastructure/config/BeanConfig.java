package br.ufmsos.estagio.infrastructure.config;

import br.ufmsos.estagio.application.usecase.*;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public RegistrarContratoEstagioUseCase registrarContratoEstagioUseCase(ContratoEstagioRepository repository) {
        return new RegistrarContratoEstagioUseCase(repository);
    }

    @Bean
    public ProjetarRecessoUseCase projetarRecessoUseCase() {
        return new ProjetarRecessoUseCase();
    }

    @Bean
    public VerificarProtecaoAvaliacaoUseCase verificarProtecaoAvaliacaoUseCase() {
        return new VerificarProtecaoAvaliacaoUseCase();
    }

    @Bean
    public ListarContratosUseCase listarContratosUseCase(ContratoEstagioRepository repository) {
        return new ListarContratosUseCase(repository);
    }
}
