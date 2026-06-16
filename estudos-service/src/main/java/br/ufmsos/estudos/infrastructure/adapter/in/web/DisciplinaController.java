package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.CadastrarDisciplinaUseCase;
import br.ufmsos.estudos.application.usecase.ConsultarGradeCurricularUseCase;
import br.ufmsos.estudos.application.usecase.DisciplinaGridDTO;
import br.ufmsos.estudos.application.usecase.ListarDisciplinasUseCase;
import br.ufmsos.estudos.domain.model.Disciplina;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
    private final CadastrarDisciplinaUseCase useCase;
    private final ListarDisciplinasUseCase listarUseCase;
    private final ConsultarGradeCurricularUseCase consultarGradeCurricularUseCase;

    public DisciplinaController(
            CadastrarDisciplinaUseCase useCase,
            ListarDisciplinasUseCase listarUseCase,
            ConsultarGradeCurricularUseCase consultarGradeCurricularUseCase) {
        this.useCase = useCase;
        this.listarUseCase = listarUseCase;
        this.consultarGradeCurricularUseCase = consultarGradeCurricularUseCase;
    }

    @PostMapping
    public Disciplina cadastrar(@RequestBody @Valid DisciplinaRequest request) {
        return useCase.executar(request.nome(), request.codigo(), request.cargaHoraria(), request.cursoId());
    }

    @GetMapping
    public List<Disciplina> listar() {
        return listarUseCase.executar();
    }

    @GetMapping("/grade/{estudanteId}")
    public Map<Integer, List<DisciplinaGridDTO>> obterGrade(@PathVariable UUID estudanteId) {
        return consultarGradeCurricularUseCase.executar(estudanteId);
    }

    public record DisciplinaRequest(String nome, String codigo, Integer cargaHoraria, UUID cursoId) {}
}
