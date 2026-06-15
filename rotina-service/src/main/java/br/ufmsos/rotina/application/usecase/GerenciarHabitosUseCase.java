package br.ufmsos.rotina.application.usecase;

import br.ufmsos.rotina.domain.model.Habito;
import br.ufmsos.rotina.domain.repository.HabitoRepository;
import java.util.List;
import java.util.UUID;

public class GerenciarHabitosUseCase {
    private final HabitoRepository repository;

    public GerenciarHabitosUseCase(HabitoRepository repository) {
        this.repository = repository;
    }

    public Habito criar(String nome, int frequencia, UUID estudanteId) {
        return repository.salvar(new Habito(null, nome, frequencia, estudanteId));
    }

    public List<Habito> listar(UUID estudanteId) {
        return repository.listarPorEstudante(estudanteId);
    }
    
    public void remover(UUID id) {
        repository.excluir(id);
    }
}
