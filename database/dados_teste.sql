-- Massa de teste para o UFMS.O.S.
-- Idempotente: pode ser executada mais de uma vez sem duplicar os registros.

INSERT INTO curso (id, nome, unidade_academica)
VALUES (
    '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001',
    'Sistemas de Informação',
    'Faculdade de Computação'
)
ON CONFLICT DO NOTHING;

INSERT INTO estudante (
    id,
    nome_completo,
    matricula,
    email,
    curso_id,
    senha_hash,
    ano_ingresso,
    forma_calculo_semestre,
    semestre_atual,
    semestre_ingresso
)
VALUES (
    '20f67c59-3c92-4b5d-a318-75551b39a50b',
    'João',
    '2024001234',
    'joao@ufms.br',
    '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001',
    '$2a$10$cYzlyEwp0LIgVapHspYURep4Hx0nWDSGyiYqpbRU5bxF.GojkbMdm',
    2024,
    'MATRICULA',
    4,
    1
)
ON CONFLICT DO NOTHING;

INSERT INTO disciplina (id, nome, codigo, carga_horaria, curso_id, pre_requisito, semestre)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1101', 'Algoritmos e Programação I', 'INFO101', 60, '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001', NULL, 1),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1102', 'Banco de Dados I', 'INFO102', 60, '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001', 'Algoritmos e Programação I', 3),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1103', 'Engenharia de Software', 'INFO201', 80, '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001', 'Banco de Dados I', 4),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1104', 'Interação Humano-Computador', 'INFO202', 60, '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1001', 'Engenharia de Software', 4)
ON CONFLICT DO NOTHING;

INSERT INTO avaliacao (id, nome, data_prevista, nota_obtida, estudante_id, disciplina_id)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1201', 'Prova 1', '2026-06-24 08:00:00', NULL, '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1101'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1202', 'Lista de Exercícios', '2026-06-12 18:00:00', 8.50, '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1102'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1203', 'Trabalho Final', '2026-07-08 14:00:00', NULL, '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1103'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1204', 'Seminário', '2026-06-05 19:00:00', 9.00, '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1104')
ON CONFLICT DO NOTHING;

INSERT INTO categoria_financeira (id, nome, cor_icone)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1301', 'Bolsa', '#176b5d'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1302', 'Alimentação', '#2456a6'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1303', 'Transporte', '#8a5b00'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1304', 'Moradia', '#6042a6')
ON CONFLICT DO NOTHING;

INSERT INTO lancamento_financeiro (id, descricao, valor, tipo, data_pagamento, estudante_id, categoria_id)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1401', 'Bolsa de extensão', 1400.00, 'RECEITA', '2026-06-05', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1301'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1402', 'Monitoria de laboratório', 300.00, 'RECEITA', '2026-06-12', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1301'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1403', 'Mercado da semana', 320.00, 'DESPESA', '2026-06-03', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1302'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1404', 'Passagem de ônibus', 180.00, 'DESPESA', '2026-06-10', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1303'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1405', 'Aluguel da república', 620.00, 'DESPESA', '2026-06-01', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1304'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1406', 'Lanche da tarde', 95.00, 'DESPESA', '2026-06-14', '20f67c59-3c92-4b5d-a318-75551b39a50b', '0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1302')
ON CONFLICT DO NOTHING;

INSERT INTO contrato_estagio (
    id,
    empresa_nome,
    data_inicio,
    data_fim,
    carga_horaria_semanal,
    valor_bolsa,
    estudante_id,
    ativo
)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1501', 'TechLab Sistemas', '2024-08-01', NULL, 20, 1300.00, '20f67c59-3c92-4b5d-a318-75551b39a50b', TRUE),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1502', 'Laboratório de Dados UFMS', '2023-02-01', '2024-01-31', 30, 1000.00, '20f67c59-3c92-4b5d-a318-75551b39a50b', FALSE)
ON CONFLICT DO NOTHING;

INSERT INTO registro_bem_estar (id, nivel_humor, nivel_exaustao, observacao, data_registro, estudante_id)
VALUES
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1601', 4, 2, 'Sono bom, rotina estável.', '2026-06-17 08:10:00', '20f67c59-3c92-4b5d-a318-75551b39a50b'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1602', 3, 3, 'Dia corrido, mas controlado.', '2026-06-15 20:00:00', '20f67c59-3c92-4b5d-a318-75551b39a50b'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1603', 2, 4, 'Prazo apertado.', '2026-06-13 21:30:00', '20f67c59-3c92-4b5d-a318-75551b39a50b'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1604', 5, 1, 'Treino e descanso em dia.', '2026-06-09 19:00:00', '20f67c59-3c92-4b5d-a318-75551b39a50b'),
    ('0d5d9baf-4d10-4f6f-8b75-6a0dfc2b1605', 2, 5, 'Semana puxada.', '2026-06-04 20:30:00', '20f67c59-3c92-4b5d-a318-75551b39a50b')
ON CONFLICT DO NOTHING;

