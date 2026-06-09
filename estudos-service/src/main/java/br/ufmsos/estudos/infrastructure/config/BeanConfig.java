package br.ufmsos.estudos.infrastructure.config;

import br.ufmsos.estudos.application.usecase.CadastrarCursoUseCase;
import br.ufmsos.estudos.domain.repository.CursoRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração do Spring para injeção dos Casos de Uso.
 * Garante que a camada de Application não dependa de anotações do Spring.
 */
@Configuration
public class BeanConfig {

    @Bean
    public CadastrarCursoUseCase cadastrarCursoUseCase(final CursoRepository cursoRepository) {
        return new CadastrarCursoUseCase(cursoRepository);
    }
}
