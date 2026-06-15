package br.ufmsos.estudos.infrastructure.adapter.in.web;

import br.ufmsos.estudos.application.usecase.AgendarRevisaoUseCase;
import br.ufmsos.estudos.domain.model.Revisao;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/revisoes")
public class RevisaoController {
    private final AgendarRevisaoUseCase useCase;

    public RevisaoController(AgendarRevisaoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<Revisao> agendar(@RequestBody @Valid RevisaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(useCase.executar(request.avaliacaoId(), request.dataHora(), request.duracao(), request.estudanteId()));
    }

    public record RevisaoRequest(UUID avaliacaoId, LocalDateTime dataHora, Integer duracao, UUID estudanteId) {}
}
