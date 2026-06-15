package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Revisao;
import br.ufmsos.estudos.domain.repository.RevisaoRepository;
import java.time.LocalDateTime;
import java.util.UUID;

public class AgendarRevisaoUseCase {
    private final RevisaoRepository repository;

    public AgendarRevisaoUseCase(RevisaoRepository repository) {
        this.repository = repository;
    }

    public Revisao executar(UUID avaliacaoId, LocalDateTime dataHora, Integer duracao, UUID estudanteId) {
        final var nova = new Revisao(null, avaliacaoId, dataHora, duracao, estudanteId);
        return repository.salvar(nova);
    }
}
