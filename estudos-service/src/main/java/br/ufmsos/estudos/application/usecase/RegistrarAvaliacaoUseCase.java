package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import java.time.LocalDateTime;
import java.util.UUID;

public class RegistrarAvaliacaoUseCase {
    private final AvaliacaoRepository repository;

    public RegistrarAvaliacaoUseCase(AvaliacaoRepository repository) {
        this.repository = repository;
    }

    public Avaliacao executar(String nome, LocalDateTime data, UUID estudanteId, UUID disciplinaId) {
        final var nova = new Avaliacao(null, nome, data, null, estudanteId, disciplinaId);
        return repository.salvar(nova);
    }
}
