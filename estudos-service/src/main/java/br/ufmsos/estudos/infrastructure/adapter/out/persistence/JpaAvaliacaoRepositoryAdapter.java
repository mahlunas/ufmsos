package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaAvaliacaoRepositoryAdapter implements AvaliacaoRepository {
    private final SpringDataAvaliacaoRepository repository;

    public JpaAvaliacaoRepositoryAdapter(SpringDataAvaliacaoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Avaliacao salvar(Avaliacao a) {
        var entity = new AvaliacaoEntity(a.id(), a.nome(), a.dataPrevista(), a.notaObtida(), a.estudanteId(), a.disciplinaId());
        var saved = repository.save(entity);
        return new Avaliacao(saved.getId(), saved.getNome(), saved.getDataPrevista(), saved.getNotaObtida(), saved.getEstudanteId(), saved.getDisciplinaId());
    }

    @Override
    public java.util.Optional<Avaliacao> buscarPorId(UUID id) {
        return repository.findById(id)
                .map(e -> new Avaliacao(e.getId(), e.getNome(), e.getDataPrevista(), e.getNotaObtida(), e.getEstudanteId(), e.getDisciplinaId()));
    }

    @Override
    public List<Avaliacao> buscarPorEstudanteEDisciplina(UUID estudanteId, UUID disciplinaId) {
        return repository.findByEstudanteIdAndDisciplinaId(estudanteId, disciplinaId).stream()
                .map(e -> new Avaliacao(e.getId(), e.getNome(), e.getDataPrevista(), e.getNotaObtida(), e.getEstudanteId(), e.getDisciplinaId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Avaliacao> buscarTodas() {
        return repository.findAll().stream()
                .map(e -> new Avaliacao(e.getId(), e.getNome(), e.getDataPrevista(), e.getNotaObtida(), e.getEstudanteId(), e.getDisciplinaId()))
                .collect(Collectors.toList());
    }
}
