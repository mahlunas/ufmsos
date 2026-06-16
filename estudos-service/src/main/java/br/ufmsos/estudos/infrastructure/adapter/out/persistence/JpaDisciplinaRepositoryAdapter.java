package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Disciplina;
import br.ufmsos.estudos.domain.repository.DisciplinaRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaDisciplinaRepositoryAdapter implements DisciplinaRepository {
    private final SpringDataDisciplinaRepository repository;

    public JpaDisciplinaRepositoryAdapter(SpringDataDisciplinaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Disciplina salvar(Disciplina d) {
        var entity = new DisciplinaEntity(d.id(), d.nome(), d.codigo(), d.cargaHoraria(), d.cursoId(), d.semestre(), d.preRequisito());
        var saved = repository.save(entity);
        return new Disciplina(saved.getId(), saved.getNome(), saved.getCodigo(), saved.getCargaHoraria(), saved.getCursoId(), saved.getSemestre(), saved.getPreRequisito());
    }

    @Override
    public Optional<Disciplina> buscarPorId(UUID id) {
        return repository.findById(id).map(e -> new Disciplina(e.getId(), e.getNome(), e.getCodigo(), e.getCargaHoraria(), e.getCursoId(), e.getSemestre(), e.getPreRequisito()));
    }

    @Override
    public List<Disciplina> buscarPorCurso(UUID cursoId) {
        return repository.findByCursoId(cursoId).stream()
                .map(e -> new Disciplina(e.getId(), e.getNome(), e.getCodigo(), e.getCargaHoraria(), e.getCursoId(), e.getSemestre(), e.getPreRequisito()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean existePorCodigo(String codigo) {
        return repository.existsByCodigo(codigo);
    }

    @Override
    public List<Disciplina> buscarTodas() {
        return repository.findAll().stream()
                .map(e -> new Disciplina(e.getId(), e.getNome(), e.getCodigo(), e.getCargaHoraria(), e.getCursoId(), e.getSemestre(), e.getPreRequisito()))
                .collect(Collectors.toList());
    }
}
