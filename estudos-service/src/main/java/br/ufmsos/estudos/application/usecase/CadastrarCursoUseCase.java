package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Curso;
import br.ufmsos.estudos.domain.repository.CursoRepository;
import java.util.UUID;

/**
 * Caso de Uso para cadastrar um novo curso.
 */
public class CadastrarCursoUseCase {

    private final CursoRepository cursoRepository;

    public CadastrarCursoUseCase(final CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public Curso executar(final String nome, final String unidadeAcademica) {
        if (cursoRepository.existePorNome(nome)) {
            throw new RuntimeException("Já existe um curso cadastrado com este nome: " + nome);
        }

        final var novoCurso = new Curso(null, nome, unidadeAcademica);
        return cursoRepository.salvar(novoCurso);
    }
}
