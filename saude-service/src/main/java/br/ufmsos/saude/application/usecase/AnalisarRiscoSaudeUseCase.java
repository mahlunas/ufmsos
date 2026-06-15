package br.ufmsos.saude.application.usecase;

import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.model.RiscoBurnout;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;
import java.util.UUID;

public class AnalisarRiscoSaudeUseCase {
    private final RegistroBemEstarRepository repository;

    public AnalisarRiscoSaudeUseCase(RegistroBemEstarRepository repository) {
        this.repository = repository;
    }

    public RiscoBurnout executar(UUID estudanteId) {
        final var ultimosRegistros = repository.buscarUltimosPorEstudante(estudanteId, 5);
        
        if (ultimosRegistros.isEmpty()) return RiscoBurnout.BAIXO;

        double mediaExaustao = ultimosRegistros.stream()
                .mapToInt(RegistroBemEstar::nivelExaustao)
                .average()
                .orElse(0.0);

        if (mediaExaustao >= 4.5) return RiscoBurnout.CRITICO;
        if (mediaExaustao >= 3.5) return RiscoBurnout.ALTO;
        if (mediaExaustao >= 2.5) return RiscoBurnout.MODERADO;
        
        return RiscoBurnout.BAIXO;
    }
}
