package br.ufmsos.rotina.application.usecase;

import br.ufmsos.rotina.domain.model.RegistroHabito;
import br.ufmsos.rotina.domain.repository.HabitoRepository;
import br.ufmsos.rotina.domain.repository.RegistroHabitoRepository;
import java.time.LocalDateTime;
import java.util.UUID;

public class RegistrarConclusaoHabitoUseCase {
    private final HabitoRepository habitoRepository;
    private final RegistroHabitoRepository registroRepository;

    public RegistrarConclusaoHabitoUseCase(HabitoRepository habitoRepository, RegistroHabitoRepository registroRepository) {
        this.habitoRepository = habitoRepository;
        this.registroRepository = registroRepository;
    }

    public RegistroHabito executar(UUID habitoId) {
        habitoRepository.buscarPorId(habitoId)
                .orElseThrow(() -> new RuntimeException("Hábito não encontrado."));
        
        return registroRepository.salvar(new RegistroHabito(null, habitoId, LocalDateTime.now()));
    }
}
