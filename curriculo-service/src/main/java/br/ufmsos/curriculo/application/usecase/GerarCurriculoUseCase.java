package br.ufmsos.curriculo.application.usecase;

import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import br.ufmsos.curriculo.infrastructure.config.RabbitConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Slf4j
public class GerarCurriculoUseCase {

    private final CurriculoRepository repository;
    private final RabbitTemplate rabbitTemplate;

    public GerarCurriculoUseCase(CurriculoRepository repository, RabbitTemplate rabbitTemplate) {
        this.repository = repository;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void solicitarGeracao(Curriculo curriculo) {
        log.info("Solicitando geração assíncrona de currículo para: {}", curriculo.nomeCompleto());
        
        // Salva o estado atual
        final var salvo = repository.salvar(curriculo);
        
        // Envia para a fila do RabbitMQ
        rabbitTemplate.convertAndSend(
            RabbitConfig.CURRICULO_EXCHANGE, 
            "curriculo.gerar.pdf", 
            salvo.id().toString()
        );
    }
}
