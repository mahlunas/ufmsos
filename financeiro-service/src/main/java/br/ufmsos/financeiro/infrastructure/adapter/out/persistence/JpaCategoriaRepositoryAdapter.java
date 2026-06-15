package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import br.ufmsos.financeiro.domain.model.CategoriaFinanceira;
import br.ufmsos.financeiro.domain.repository.CategoriaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaCategoriaRepositoryAdapter implements CategoriaRepository {
    private final SpringDataCategoriaRepository repository;

    public JpaCategoriaRepositoryAdapter(SpringDataCategoriaRepository repository) {
        this.repository = repository;
    }

    @Override
    public CategoriaFinanceira salvar(CategoriaFinanceira c) {
        final var entity = new CategoriaEntity(c.id(), c.nome(), c.corIcone());
        final var saved = repository.save(entity);
        return new CategoriaFinanceira(saved.getId(), saved.getNome(), saved.getCorIcone());
    }

    @Override
    public Optional<CategoriaFinanceira> buscarPorId(UUID id) {
        return repository.findById(id)
                .map(e -> new CategoriaFinanceira(e.getId(), e.getNome(), e.getCorIcone()));
    }

    @Override
    public List<CategoriaFinanceira> listarTodas() {
        return repository.findAll().stream()
                .map(e -> new CategoriaFinanceira(e.getId(), e.getNome(), e.getCorIcone()))
                .collect(Collectors.toList());
    }
}
