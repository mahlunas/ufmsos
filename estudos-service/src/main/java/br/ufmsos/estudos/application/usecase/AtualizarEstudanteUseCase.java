package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import java.util.UUID;

public class AtualizarEstudanteUseCase {
    private final EstudanteRepository estudanteRepository;

    public AtualizarEstudanteUseCase(EstudanteRepository estudanteRepository) {
        this.estudanteRepository = estudanteRepository;
    }

    public Estudante executar(
            UUID id,
            String nomeCompleto,
            String email,
            UUID cursoId,
            Integer semestreAtual,
            Integer anoIngresso,
            Integer semestreIngresso,
            String formaCalculoSemestre) {
        
        Estudante estudante = estudanteRepository.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado com o ID: " + id));

        // Create updated record
        Estudante atualizado = new Estudante(
                id,
                nomeCompleto != null ? nomeCompleto : estudante.nomeCompleto(),
                estudante.matricula(),
                email != null ? email : estudante.email(),
                cursoId != null ? cursoId : estudante.cursoId(),
                semestreAtual != null ? semestreAtual : estudante.semestreAtual(),
                anoIngresso != null ? anoIngresso : estudante.anoIngresso(),
                semestreIngresso != null ? semestreIngresso : estudante.semestreIngresso(),
                formaCalculoSemestre != null ? formaCalculoSemestre : estudante.formaCalculoSemestre()
        );

        estudanteRepository.salvar(atualizado);
        return atualizado;
    }
}
