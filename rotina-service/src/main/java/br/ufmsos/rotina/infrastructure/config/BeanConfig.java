package br.ufmsos.rotina.infrastructure.config;

import br.ufmsos.rotina.application.usecase.GerenciarHabitosUseCase;
import br.ufmsos.rotina.application.usecase.RegistrarConclusaoHabitoUseCase;
import br.ufmsos.rotina.domain.repository.HabitoRepository;
import br.ufmsos.rotina.domain.repository.RegistroHabitoRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public GerenciarHabitosUseCase gerenciarHabitosUseCase(HabitoRepository repository) {
        return new GerenciarHabitosUseCase(repository);
    }

    @Bean
    public RegistrarConclusaoHabitoUseCase registrarConclusaoHabitoUseCase(HabitoRepository habitoRepository, RegistroHabitoRepository registroRepository) {
        return new RegistrarConclusaoHabitoUseCase(habitoRepository, registroRepository);
    }
}
