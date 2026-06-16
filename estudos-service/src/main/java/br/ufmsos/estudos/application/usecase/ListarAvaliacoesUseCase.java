package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import java.util.List;

public class ListarAvaliacoesUseCase {
    private final AvaliacaoRepository repository;

    public ListarAvaliacoesUseCase(AvaliacaoRepository repository) {
        this.repository = repository;
    }

    public List<Avaliacao> executar() {
        return repository.buscarTodas();
    }
}
