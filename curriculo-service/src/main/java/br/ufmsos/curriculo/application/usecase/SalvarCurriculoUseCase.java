package br.ufmsos.curriculo.application.usecase;

import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import java.util.List;
import java.util.UUID;

public class SalvarCurriculoUseCase {
    private final CurriculoRepository repository;

    public SalvarCurriculoUseCase(CurriculoRepository repository) {
        this.repository = repository;
    }

    public Curriculo executar(
            UUID estudanteId,
            String nomeCompleto,
            String objetivo,
            List<String> competencias,
            List<String> experiencias) {
        
        Curriculo existente = repository.buscarPorEstudante(estudanteId)
                .orElse(new Curriculo(null, nomeCompleto, objetivo, competencias, experiencias, estudanteId));

        Curriculo atualizado = new Curriculo(
                existente.id(),
                nomeCompleto != null ? nomeCompleto : existente.nomeCompleto(),
                objetivo != null ? objetivo : existente.objetivo(),
                competencias != null ? competencias : existente.competencias(),
                experiencias != null ? experiencias : existente.experiencias(),
                estudanteId
        );

        return repository.salvar(atualizado);
    }
}
