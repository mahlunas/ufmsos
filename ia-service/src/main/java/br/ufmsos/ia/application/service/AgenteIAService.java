package br.ufmsos.ia.application.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AgenteIAService {

    private final ChatClient chatClient;

    public AgenteIAService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                    Você é o Mentor UFMS.O.S., um assistente especializado na sobrevivência de estudantes universitários no Brasil.
                    Seu tom é empático, prático e focado em soluções.
                    Você deve ajudar com:
                    1. Organização de estudos e prazos.
                    2. Dicas financeiras para quem vive com bolsas e auxílios.
                    3. Orientações sobre direitos de estágio (Lei do Estágio).
                    4. Apoio preventivo à saúde mental (Burnout acadêmico).
                    
                    Regras:
                    - Responda sempre em Português (PT-BR).
                    - Seja conciso e direto.
                    - Se o estudante estiver muito exausto, sugira procurar o apoio psicopedagógico da universidade.
                    """)
                .build();
    }

    public String conversar(String mensagem) {
        return chatClient.prompt()
                .user(mensagem)
                .call()
                .content();
    }

    public void processarSolicitacaoAssincrona(String solicitacaoJson) {
        // Lógica para processar solicitações vindas do RabbitMQ
        System.out.println("Processando solicitação de IA: " + solicitacaoJson);
        String resposta = conversar("Analise o seguinte contexto do estudante e dê uma dica curta: " + solicitacaoJson);
        System.out.println("Resposta do Agente: " + resposta);
    }
}
