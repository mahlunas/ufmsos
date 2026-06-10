package br.ufmsos.financeiro.infrastructure.config;

import br.ufmsos.financeiro.application.usecase.RegistrarLancamentoUseCase;
import br.ufmsos.financeiro.domain.repository.LancamentoRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public RegistrarLancamentoUseCase registrarLancamentoUseCase(LancamentoRepository repository) {
        return new RegistrarLancamentoUseCase(repository);
    }
}
