package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.CadastrarDisciplinaUseCase;
import br.ufmsos.estudos.domain.model.Disciplina;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
    private final CadastrarDisciplinaUseCase useCase;

    public DisciplinaController(CadastrarDisciplinaUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public Disciplina cadastrar(@RequestBody @Valid DisciplinaRequest request) {
        return useCase.executar(request.nome(), request.codigo(), request.cargaHoraria(), request.cursoId());
    }

    public record DisciplinaRequest(String nome, String codigo, Integer cargaHoraria, UUID cursoId) {}
}
