package br.ufmsos.financeiro.infrastructure.config;

import br.ufmsos.financeiro.application.usecase.*;
import br.ufmsos.financeiro.domain.repository.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public RegistrarLancamentoUseCase registrarLancamentoUseCase(LancamentoRepository repository) {
        return new RegistrarLancamentoUseCase(repository);
    }

    @Bean
    public GerenciarCategoriasUseCase gerenciarCategoriasUseCase(CategoriaRepository repository) {
        return new GerenciarCategoriasUseCase(repository);
    }

    @Bean
    public ConsultarResumoFinanceiroUseCase consultarResumoFinanceiroUseCase(
            LancamentoRepository lancamentoRepository, 
            CategoriaRepository categoriaRepository) {
        return new ConsultarResumoFinanceiroUseCase(lancamentoRepository, categoriaRepository);
    }
}
