package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.RegistrarAvaliacaoUseCase;
import br.ufmsos.estudos.application.usecase.LancarNotaUseCase;
import br.ufmsos.estudos.domain.model.Avaliacao;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {
    private final RegistrarAvaliacaoUseCase registrarUseCase;
    private final LancarNotaUseCase lancarNotaUseCase;
    private final br.ufmsos.estudos.application.usecase.ListarAvaliacoesUseCase listarUseCase;

    public AvaliacaoController(RegistrarAvaliacaoUseCase registrarUseCase, LancarNotaUseCase lancarNotaUseCase, br.ufmsos.estudos.application.usecase.ListarAvaliacoesUseCase listarUseCase) {
        this.registrarUseCase = registrarUseCase;
        this.lancarNotaUseCase = lancarNotaUseCase;
        this.listarUseCase = listarUseCase;
    }

    @PostMapping
    public ResponseEntity<Avaliacao> registrar(@RequestBody @Valid AvaliacaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(registrarUseCase.executar(request.nome(), request.data(), request.estudanteId(), request.disciplinaId()));
    }

    @GetMapping
    public ResponseEntity<java.util.List<Avaliacao>> listar() {
        return ResponseEntity.ok(listarUseCase.executar());
    }

    @PatchMapping("/{id}/nota")
    public ResponseEntity<Avaliacao> lancarNota(@PathVariable UUID id, @RequestBody NotaRequest request) {
        return ResponseEntity.ok(lancarNotaUseCase.executar(id, request.nota()));
    }

    public record AvaliacaoRequest(String nome, LocalDateTime data, UUID estudanteId, UUID disciplinaId) {}
    public record NotaRequest(Double nota) {}
}
