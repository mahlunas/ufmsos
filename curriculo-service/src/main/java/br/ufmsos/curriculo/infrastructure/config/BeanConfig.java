package br.ufmsos.curriculo.infrastructure.config;

import br.ufmsos.curriculo.application.usecase.GerarCurriculoUseCase;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public GerarCurriculoUseCase gerarCurriculoUseCase(CurriculoRepository repository, RabbitTemplate rabbitTemplate) {
        return new GerarCurriculoUseCase(repository, rabbitTemplate);
    }
}
