package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import java.util.UUID;

public class LancarNotaUseCase {
    private final AvaliacaoRepository repository;

    public LancarNotaUseCase(AvaliacaoRepository repository) {
        this.repository = repository;
    }

    public Avaliacao executar(UUID avaliacaoId, Double nota) {
        final var avaliacao = repository.buscarPorId(avaliacaoId)
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada."));

        final var avaliacaoComNota = new Avaliacao(
                avaliacao.id(),
                avaliacao.nome(),
                avaliacao.dataPrevista(),
                nota,
                avaliacao.estudanteId(),
                avaliacao.disciplinaId()
        );

        return repository.salvar(avaliacaoComNota);
    }
}
