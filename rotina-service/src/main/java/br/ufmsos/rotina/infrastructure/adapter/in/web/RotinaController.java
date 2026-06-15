package br.ufmsos.rotina.infrastructure.adapter.in.web;

import br.ufmsos.rotina.application.usecase.GerenciarHabitosUseCase;
import br.ufmsos.rotina.application.usecase.RegistrarConclusaoHabitoUseCase;
import br.ufmsos.rotina.domain.model.Habito;
import br.ufmsos.rotina.domain.model.RegistroHabito;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rotina")
public class RotinaController {
    private final GerenciarHabitosUseCase gerenciarHabitosUseCase;
    private final RegistrarConclusaoHabitoUseCase registrarConclusaoUseCase;

    public RotinaController(GerenciarHabitosUseCase gerenciarHabitosUseCase, RegistrarConclusaoHabitoUseCase registrarConclusaoUseCase) {
        this.gerenciarHabitosUseCase = gerenciarHabitosUseCase;
        this.registrarConclusaoUseCase = registrarConclusaoUseCase;
    }

    @PostMapping("/habitos")
    public Habito criar(@RequestBody HabitoRequest request) {
        return gerenciarHabitosUseCase.criar(request.nome(), request.frequenciaDiaria(), request.estudanteId());
    }

    @GetMapping("/habitos/{estudanteId}")
    public List<Habito> listar(@PathVariable UUID estudanteId) {
        return gerenciarHabitosUseCase.listar(estudanteId);
    }

    @PostMapping("/habitos/{id}/concluir")
    public RegistroHabito concluir(@PathVariable UUID id) {
        return registrarConclusaoUseCase.executar(id);
    }

    public record HabitoRequest(String nome, int frequenciaDiaria, UUID estudanteId) {}
}
