package br.ufmsos.ia.infrastructure.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String IA_FILA = "ia.solicitacao.fila";
    public static final String IA_EXCHANGE = "ia.exchange";
    public static final String IA_ROUTING_KEY = "ia.routing.key";

    @Bean
    public Queue iaFila() {
        return new Queue(IA_FILA, true);
    }

    @Bean
    public TopicExchange iaExchange() {
        return new TopicExchange(IA_EXCHANGE);
    }

    @Bean
    public Binding binding(Queue iaFila, TopicExchange iaExchange) {
        return BindingBuilder.bind(iaFila).to(iaExchange).with(IA_ROUTING_KEY);
    }
}
