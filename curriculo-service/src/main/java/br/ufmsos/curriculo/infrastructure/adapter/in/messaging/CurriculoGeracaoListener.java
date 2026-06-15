package br.ufmsos.curriculo.infrastructure.adapter.in.messaging;

import br.ufmsos.curriculo.infrastructure.config.RabbitConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CurriculoGeracaoListener {

    @RabbitListener(queues = RabbitConfig.CURRICULO_GERACAO_FILA)
    public void processarGeracao(String curriculoId) {
        log.info("### WORKER: Iniciando geração de PDF para o currículo ID: {} ###", curriculoId);
        
        try {
            // Simula o tempo de geração de um PDF complexo
            Thread.sleep(5000);
            log.info("### WORKER: PDF Gerado com sucesso e enviado para o e-mail do estudante! ###");
        } catch (InterruptedException e) {
            log.error("Erro no worker de geração", e);
        }
    }
}
