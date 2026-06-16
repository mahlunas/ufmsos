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
    private final br.ufmsos.estudos.application.usecase.ListarDisciplinasUseCase listarUseCase;

    public DisciplinaController(CadastrarDisciplinaUseCase useCase, br.ufmsos.estudos.application.usecase.ListarDisciplinasUseCase listarUseCase) {
        this.useCase = useCase;
        this.listarUseCase = listarUseCase;
    }

    @PostMapping
    public Disciplina cadastrar(@RequestBody @Valid DisciplinaRequest request) {
        return useCase.executar(request.nome(), request.codigo(), request.cargaHoraria(), request.cursoId());
    }

    @GetMapping
    public java.util.List<Disciplina> listar() {
        return listarUseCase.executar();
    }

    public record DisciplinaRequest(String nome, String codigo, Integer cargaHoraria, UUID cursoId) {}
}
