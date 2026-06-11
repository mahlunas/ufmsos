# UFMS.O.S. - Plataforma de Sobrevivência Universitária

A UFMS.O.S. é um ecossistema digital holístico projetado para atuar como um assistente centralizador na rotina do estudante universitário brasileiro, focando em organização pedagógica, governança financeira, saúde mental e compliance de estágios.

## 🚀 Tecnologias
- **Java 25** (OpenJDK / Temurin)
- **Spring Boot 4.0.0**
- **Maven** (Multi-module architecture)
- **RabbitMQ** (Mensageria Assíncrona)
- **PostgreSQL 17**
- **Docker & Docker Compose**
- **Spring AI** (OpenAI / GPT-4o)
- **JWT** (Stateless Authentication)

## 🏗️ Arquitetura de Microserviços
O sistema é dividido em 8 microserviços especializados:

| Serviço | Porta | Descrição |
| :--- | :--- | :--- |
| `ms-auth` | 8080 | Gestão de identidade e emissão de tokens JWT. |
| `ms-estudos` | 8081 | Organização pedagógica, cursos e disciplinas. |
| `ms-financeiro` | 8082 | Governança financeira (receitas/despesas). |
| `ms-estagio` | 8083 | Compliance de estágios (Limite de 30h). |
| `ms-saude` | 8084 | Monitoramento de saúde mental e burnout. |
| `ms-rotina` | 8085 | Gestão de hábitos e rotina diária. |
| `ms-curriculo` | 8086 | Engenharia e exportação de currículos. |
| `ms-ia` | 8087 | Agente Mentor de IA (sobrevivência acadêmica). |

## 🛡️ Regras de Proteção Ativa (Mandatos)
- **Internship Limit:** Bloqueio automático de contratos > 30h semanais.
- **Financial Integrity:** Impede registros financeiros negativos ou nulos.
- **Mental Health Monitoring:** Alertas automáticos baseados em níveis de exaustão.
- **Language:** Código de domínio, DB e comentários obrigatoriamente em **PT-BR**.
- **No Mocks:** Testes de integração utilizam instâncias reais.

## 🛠️ Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados.
- Chave da API OpenAI (para o Agente de IA).

### Subindo o Ambiente
1. Clone o repositório.
2. Compile o projeto (necessário JDK 25):
   ```bash
   mvn clean install -DskipTests
   ```
3. Suba os containers:
   ```bash
   docker-compose up --build -d
   ```

## 🧪 Testes de Integração
Um script automatizado está disponível para validar o fluxo completo:
```bash
python test_integration.py
```