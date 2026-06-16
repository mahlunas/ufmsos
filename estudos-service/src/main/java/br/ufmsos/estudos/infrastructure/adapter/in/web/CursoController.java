package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.CadastrarCursoUseCase;
import br.ufmsos.estudos.domain.model.Curso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST para o domínio de Cursos.
 */
@RestController
@RequestMapping("/estudos")
public class CursoController {

    private final CadastrarCursoUseCase cadastrarCursoUseCase;
    private final br.ufmsos.estudos.application.usecase.ListarCursosUseCase listarCursosUseCase;

    public CursoController(final CadastrarCursoUseCase cadastrarCursoUseCase, final br.ufmsos.estudos.application.usecase.ListarCursosUseCase listarCursosUseCase) {
        this.cadastrarCursoUseCase = cadastrarCursoUseCase;
        this.listarCursosUseCase = listarCursosUseCase;
    }

    @PostMapping
    public ResponseEntity<Curso> cadastrar(@RequestBody @Valid CursoRequest request) {
        final var curso = cadastrarCursoUseCase.executar(request.nome(), request.unidadeAcademica());
        return ResponseEntity.status(HttpStatus.CREATED).body(curso);
    }

    @GetMapping
    public ResponseEntity<java.util.List<Curso>> listar() {
        return ResponseEntity.ok(listarCursosUseCase.executar());
    }

    public record CursoRequest(
        @NotBlank(message = "O nome é obrigatório") String nome,
        String unidadeAcademica
    ) {}
}
