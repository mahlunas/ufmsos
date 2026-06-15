package br.ufmsos.ia.infrastructure.adapter.in.messaging;

import br.ufmsos.ia.application.service.AgenteIAService;
import br.ufmsos.ia.infrastructure.config.RabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class IaListener {

    private final AgenteIAService agenteIAService;

    public IaListener(AgenteIAService agenteIAService) {
        this.agenteIAService = agenteIAService;
    }

    @RabbitListener(queues = RabbitConfig.IA_FILA)
    public void receberSolicitacao(String mensagem) {
        agenteIAService.processarSolicitacaoAssincrona(mensagem);
    }
}
