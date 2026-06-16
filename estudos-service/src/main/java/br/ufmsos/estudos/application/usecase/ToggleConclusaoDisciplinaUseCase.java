package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class ToggleConclusaoDisciplinaUseCase {
    private final AvaliacaoRepository avaliacaoRepository;

    public ToggleConclusaoDisciplinaUseCase(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public void executar(UUID estudanteId, UUID disciplinaId, boolean concluida) {
        if (concluida) {
            // Check if there is already a passing evaluation (grade >= 6.0)
            List<Avaliacao> avaliacoes = avaliacaoRepository.buscarPorEstudanteEDisciplina(estudanteId, disciplinaId);
            boolean jaConcluida = false;
            for (Avaliacao a : avaliacoes) {
                if (a.notaObtida() != null && a.notaObtida() >= 6.0) {
                    jaConcluida = true;
                    break;
                }
            }

            if (!jaConcluida) {
                // Register manual completion record with a grade of 10.0
                Avaliacao nova = new Avaliacao(
                        UUID.randomUUID(),
                        "Aprovado (Manual)",
                        LocalDateTime.now(),
                        10.0,
                        estudanteId,
                        disciplinaId
                );
                avaliacaoRepository.salvar(nova);
            }
        } else {
            // Delete all evaluations for this student and discipline
            avaliacaoRepository.deletarPorEstudanteEDisciplina(estudanteId, disciplinaId);
        }
    }
}
