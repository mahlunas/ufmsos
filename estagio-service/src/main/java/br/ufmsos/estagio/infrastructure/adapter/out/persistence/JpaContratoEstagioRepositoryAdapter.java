package br.ufmsos.estagio.infrastructure.adapter.out.persistence;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class JpaContratoEstagioRepositoryAdapter implements ContratoEstagioRepository {
    private final SpringDataContratoEstagioRepository repository;

    public JpaContratoEstagioRepositoryAdapter(SpringDataContratoEstagioRepository repository) {
        this.repository = repository;
    }

    @Override
    public ContratoEstagio salvar(ContratoEstagio contrato) {
        final var entity = new ContratoEstagioEntity(
            contrato.id(), 
            contrato.empresaNome(), 
            contrato.dataInicio(), 
            contrato.dataFim(), 
            contrato.cargaHorariaSemanal(), 
            contrato.estudanteId(), 
            contrato.ativo()
        );
        final var saved = repository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<ContratoEstagio> buscarPorId(UUID id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public java.util.List<ContratoEstagio> buscarPorEstudante(UUID estudanteId) {
        return repository.findByEstudanteId(estudanteId).stream()
                .map(this::toDomain)
                .collect(java.util.stream.Collectors.toList());
    }

    private ContratoEstagio toDomain(ContratoEstagioEntity e) {
        return new ContratoEstagio(
                e.getId(),
                e.getEmpresaNome(),
                e.getDataInicio(),
                e.getDataFim(),
                e.getCargaHorariaSemanal(),
                e.getEstudanteId(),
                e.isAtivo()
        );
    }
}
