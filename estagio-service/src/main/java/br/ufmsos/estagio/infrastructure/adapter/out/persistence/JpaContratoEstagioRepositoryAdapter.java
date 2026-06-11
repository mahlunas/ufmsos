package br.ufmsos.estagio.infrastructure.adapter.out.persistence;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import org.springframework.stereotype.Component;

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
        return new ContratoEstagio(
            saved.getId(), 
            saved.getEmpresaNome(), 
            saved.getDataInicio(), 
            saved.getDataFim(), 
            saved.getCargaHorariaSemanal(), 
            saved.getEstudanteId(), 
            saved.isAtivo()
        );
    }
}
