package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

@Component
public class JpaEstudanteRepositoryAdapter implements EstudanteRepository {
    private final SpringDataEstudanteRepository repository;

    public JpaEstudanteRepositoryAdapter(SpringDataEstudanteRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Estudante> buscarPorId(UUID id) {
        return repository.findById(id).map(e -> new Estudante(
            e.getId(),
            e.getNomeCompleto(),
            e.getMatricula(),
            e.getEmail(),
            e.getCursoId(),
            e.getSemestreAtual(),
            e.getAnoIngresso(),
            e.getSemestreIngresso(),
            e.getFormaCalculoSemestre()
        ));
    }

    @Override
    public void salvar(Estudante estudante) {
        EstudanteEntity entity = repository.findById(estudante.id())
            .orElseGet(() -> {
                EstudanteEntity newEntity = new EstudanteEntity();
                newEntity.setId(estudante.id());
                return newEntity;
            });
        
        entity.setNomeCompleto(estudante.nomeCompleto());
        entity.setMatricula(estudante.matricula());
        entity.setEmail(estudante.email());
        entity.setCursoId(estudante.cursoId());
        entity.setSemestreAtual(estudante.semestreAtual());
        entity.setAnoIngresso(estudante.anoIngresso());
        entity.setSemestreIngresso(estudante.semestreIngresso());
        entity.setFormaCalculoSemestre(estudante.formaCalculoSemestre());
        
        if (entity.getSenhaHash() == null) {
            entity.setSenhaHash("");
        }
        
        repository.save(entity);
    }
}
