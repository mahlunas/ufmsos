package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.AtualizarEstudanteUseCase;
import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {
    private final EstudanteRepository estudanteRepository;
    private final AtualizarEstudanteUseCase atualizarEstudanteUseCase;

    public EstudanteController(EstudanteRepository estudanteRepository, AtualizarEstudanteUseCase atualizarEstudanteUseCase) {
        this.estudanteRepository = estudanteRepository;
        this.atualizarEstudanteUseCase = atualizarEstudanteUseCase;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudante> obterEstudante(@PathVariable UUID id) {
        return estudanteRepository.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudante> atualizarEstudante(@PathVariable UUID id, @RequestBody @Valid AtualizarRequest request) {
        Estudante atualizado = atualizarEstudanteUseCase.executar(
                id,
                request.nomeCompleto(),
                request.email(),
                request.cursoId(),
                request.semestreAtual(),
                request.anoIngresso(),
                request.semestreIngresso(),
                request.formaCalculoSemestre()
        );
        return ResponseEntity.ok(atualizado);
    }

    public record AtualizarRequest(
            String nomeCompleto,
            String email,
            UUID cursoId,
            Integer semestreAtual,
            Integer anoIngresso,
            Integer semestreIngresso,
            String formaCalculoSemestre
    ) {}
}
