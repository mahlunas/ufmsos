package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Disciplina;
import br.ufmsos.estudos.domain.repository.DisciplinaRepository;
import java.util.UUID;

public class CadastrarDisciplinaUseCase {
    private final DisciplinaRepository repository;

    public CadastrarDisciplinaUseCase(DisciplinaRepository repository) {
        this.repository = repository;
    }

    public Disciplina executar(String nome, String codigo, Integer cargaHoraria, UUID cursoId) {
        if (repository.existePorCodigo(codigo)) {
            throw new RuntimeException("Já existe uma disciplina com o código: " + codigo);
        }
        final var nova = new Disciplina(null, nome, codigo, cargaHoraria, cursoId);
        return repository.salvar(nova);
    }
}
