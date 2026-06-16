package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.CadastrarDisciplinaUseCase;
import br.ufmsos.estudos.application.usecase.ConsultarGradeCurricularUseCase;
import br.ufmsos.estudos.application.usecase.DisciplinaGridDTO;
import br.ufmsos.estudos.application.usecase.ListarDisciplinasUseCase;
import br.ufmsos.estudos.domain.model.Disciplina;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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
    private final br.ufmsos.estudos.application.usecase.ToggleConclusaoDisciplinaUseCase toggleConclusaoDisciplinaUseCase;

    public DisciplinaController(
            CadastrarDisciplinaUseCase useCase,
            ListarDisciplinasUseCase listarUseCase,
            ConsultarGradeCurricularUseCase consultarGradeCurricularUseCase,
            br.ufmsos.estudos.application.usecase.ToggleConclusaoDisciplinaUseCase toggleConclusaoDisciplinaUseCase) {
        this.useCase = useCase;
        this.listarUseCase = listarUseCase;
        this.consultarGradeCurricularUseCase = consultarGradeCurricularUseCase;
        this.toggleConclusaoDisciplinaUseCase = toggleConclusaoDisciplinaUseCase;
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
    public Map<Integer, List<br.ufmsos.estudos.application.usecase.DisciplinaGridDTO>> obterGrade(@PathVariable UUID estudanteId) {
        return consultarGradeCurricularUseCase.executar(estudanteId);
    }

    @PostMapping("/concluir")
    public ResponseEntity<Void> toggleConclusao(@RequestBody @Valid ToggleConclusaoRequest request) {
        toggleConclusaoDisciplinaUseCase.executar(request.estudanteId(), request.disciplinaId(), request.concluida());
        return ResponseEntity.ok().build();
    }

    public record DisciplinaRequest(String nome, String codigo, Integer cargaHoraria, UUID cursoId) {}
    public record ToggleConclusaoRequest(UUID estudanteId, UUID disciplinaId, boolean concluida) {}
}
