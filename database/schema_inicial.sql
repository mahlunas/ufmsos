-- UFMS.O.S. - Schema Inicial de Banco de Dados (PostgreSQL)
-- Idioma: PT-BR (Conforme Mandato)

-- 0. Módulo: Autenticação e Usuários
CREATE TABLE IF NOT EXISTS usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL
);

-- 1. Módulo: Organização Pedagógica (Estudos)
CREATE TABLE IF NOT EXISTS curso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    unidade_academica VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS disciplina (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    carga_horaria INTEGER NOT NULL,
    curso_id UUID REFERENCES curso(id)
);

CREATE TABLE IF NOT EXISTS estudante (
    id UUID PRIMARY KEY REFERENCES usuario(id), -- Shared ID approach
    nome_completo VARCHAR(255) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    curso_id UUID REFERENCES curso(id)
    -- email e senha_hash removidos (herdado do usuario)
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: Prova 1, Trabalho Final
    data_prevista TIMESTAMP NOT NULL,
    nota_obtida DECIMAL(4,2) CHECK (nota_obtida >= 0),
    estudante_id UUID REFERENCES estudante(id),
    disciplina_id UUID REFERENCES disciplina(id)
);

-- 2. Módulo: Governança Financeira Estudantil
CREATE TABLE IF NOT EXISTS categoria_financeira (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL -- Ex: Bolsa, Alimentação, República
);

CREATE TABLE IF NOT EXISTS lancamento_financeiro (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descricao TEXT NOT NULL,
    valor DECIMAL(12,2) NOT NULL CHECK (valor > 0), -- Mandato: Proibido valor <= 0
    tipo VARCHAR(10) CHECK (tipo IN ('RECEITA', 'DESPESA')),
    data_pagamento DATE NOT NULL,
    estudante_id UUID REFERENCES estudante(id),
    categoria_id UUID REFERENCES categoria_financeira(id)
);

-- 3. Módulo: Compliance e Rastreamento de Estágios
CREATE TABLE IF NOT EXISTS contrato_estagio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    carga_horaria_semanal INTEGER NOT NULL CHECK (carga_horaria_semanal <= 30), -- Mandato: Teto Estatutário
    valor_bolsa DECIMAL(12,2) NOT NULL,
    estudante_id UUID REFERENCES estudante(id),
    ativo BOOLEAN DEFAULT TRUE
);

-- 4. Módulo: Acompanhamento da Saúde Mental
CREATE TABLE IF NOT EXISTS registro_bem_estar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nivel_humor INTEGER NOT NULL CHECK (nivel_humor BETWEEN 1 AND 5),
    nivel_exaustao INTEGER NOT NULL CHECK (nivel_exaustao BETWEEN 1 AND 5),
    observacao TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estudante_id UUID REFERENCES estudante(id)
);

-- 5. Módulo: Gestão da Rotina Integrada
CREATE TABLE IF NOT EXISTS habito (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: Beber Água, Dormir 8h
    frequencia_diaria INTEGER DEFAULT 1,
    estudante_id UUID REFERENCES estudante(id)
);

CREATE TABLE IF NOT EXISTS registro_habito (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habito_id UUID REFERENCES habito(id),
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Módulo: Engenharia de Currículos
CREATE TABLE IF NOT EXISTS curriculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_completo VARCHAR(255) NOT NULL,
    objetivo TEXT,
    estudante_id UUID UNIQUE REFERENCES estudante(id)
);

CREATE TABLE IF NOT EXISTS curriculo_competencias (
    curriculo_entity_id UUID REFERENCES curriculo(id),
    competencias VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS curriculo_experiencias (
    curriculo_entity_id UUID REFERENCES curriculo(id),
    experiencias VARCHAR(255)
);
