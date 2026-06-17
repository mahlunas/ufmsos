package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import java.util.UUID;

public class CriarEstudanteUseCase {
    private final EstudanteRepository estudanteRepository;

    public CriarEstudanteUseCase(EstudanteRepository estudanteRepository) {
        this.estudanteRepository = estudanteRepository;
    }

    public Estudante executar(
            UUID usuarioId,
            String nomeCompleto,
            String matricula,
            UUID cursoId,
            Integer semestreAtual,
            Integer anoIngresso,
            Integer semestreIngresso,
            String formaCalculoSemestre) {
        
        if (estudanteRepository.buscarPorId(usuarioId).isPresent()) {
            throw new RuntimeException("Perfil de estudante já existe para este usuário.");
        }

        Estudante novoEstudante = new Estudante(
                usuarioId,
                nomeCompleto,
                matricula,
                cursoId,
                semestreAtual,
                anoIngresso,
                semestreIngresso,
                formaCalculoSemestre
        );

        estudanteRepository.salvar(novoEstudante);
        return novoEstudante;
    }
}
