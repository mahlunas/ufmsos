package br.ufmsos.curriculo.infrastructure.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String CURRICULO_GERACAO_FILA = "curriculo.geracao.fila";
    public static final String CURRICULO_EXCHANGE = "curriculo.exchange";

    @Bean
    public Queue curriculoFila() {
        return new Queue(CURRICULO_GERACAO_FILA, true);
    }

    @Bean
    public TopicExchange curriculoExchange() {
        return new TopicExchange(CURRICULO_EXCHANGE);
    }

    @Bean
    public Binding binding(Queue curriculoFila, TopicExchange curriculoExchange) {
        return BindingBuilder.bind(curriculoFila).to(curriculoExchange).with("curriculo.gerar.#");
    }
}
