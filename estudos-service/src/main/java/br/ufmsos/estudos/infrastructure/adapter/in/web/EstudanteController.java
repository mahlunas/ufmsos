package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.AtualizarEstudanteUseCase;
import br.ufmsos.estudos.application.usecase.CriarEstudanteUseCase;
import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {
    private final EstudanteRepository estudanteRepository;
    private final AtualizarEstudanteUseCase atualizarEstudanteUseCase;
    private final CriarEstudanteUseCase criarEstudanteUseCase;

    public EstudanteController(
            EstudanteRepository estudanteRepository,
            AtualizarEstudanteUseCase atualizarEstudanteUseCase,
            CriarEstudanteUseCase criarEstudanteUseCase) {
        this.estudanteRepository = estudanteRepository;
        this.atualizarEstudanteUseCase = atualizarEstudanteUseCase;
        this.criarEstudanteUseCase = criarEstudanteUseCase;
    }

    @GetMapping("/me")
    public ResponseEntity<Estudante> obterMeuPerfil() {
        UUID usuarioId = getUsuarioIdAutenticado();
        return estudanteRepository.buscarPorId(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/me")
    public ResponseEntity<Estudante> criarMeuPerfil(@RequestBody @Valid CriarRequest request) {
        UUID usuarioId = getUsuarioIdAutenticado();
        Estudante criado = criarEstudanteUseCase.executar(
                usuarioId,
                request.nomeCompleto(),
                request.matricula(),
                request.cursoId(),
                request.semestreAtual(),
                request.anoIngresso(),
                request.semestreIngresso(),
                request.formaCalculoSemestre()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
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
                request.cursoId(),
                request.semestreAtual(),
                request.anoIngresso(),
                request.semestreIngresso(),
                request.formaCalculoSemestre()
        );
        return ResponseEntity.ok(atualizado);
    }

    private UUID getUsuarioIdAutenticado() {
        Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (details instanceof String) {
            return UUID.fromString((String) details);
        }
        throw new RuntimeException("Usuário não autenticado corretamente (ID ausente no token).");
    }

    public record CriarRequest(
            String nomeCompleto,
            String matricula,
            UUID cursoId,
            Integer semestreAtual,
            Integer anoIngresso,
            Integer semestreIngresso,
            String formaCalculoSemestre
    ) {}

    public record AtualizarRequest(
            String nomeCompleto,
            UUID cursoId,
            Integer semestreAtual,
            Integer anoIngresso,
            Integer semestreIngresso,
            String formaCalculoSemestre
    ) {}
}

