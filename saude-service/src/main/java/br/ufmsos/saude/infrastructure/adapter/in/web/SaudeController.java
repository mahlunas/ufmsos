package br.ufmsos.saude.infrastructure.adapter.in.web;

import br.ufmsos.saude.application.usecase.AnalisarRiscoSaudeUseCase;
import br.ufmsos.saude.application.usecase.RegistrarBemEstarUseCase;
import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.model.RiscoBurnout;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/saude")
public class SaudeController {
    private final RegistrarBemEstarUseCase registrarUseCase;
    private final AnalisarRiscoSaudeUseCase analisarUseCase;

    public SaudeController(RegistrarBemEstarUseCase registrarUseCase, AnalisarRiscoSaudeUseCase analisarUseCase) {
        this.registrarUseCase = registrarUseCase;
        this.analisarUseCase = analisarUseCase;
    }

    @PostMapping("/registros")
    public ResponseEntity<RegistroBemEstar> registrar(@RequestBody @Valid RegistroBemEstar registro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registrarUseCase.executar(registro));
    }

    @GetMapping("/analise/{estudanteId}")
    public ResponseEntity<RiscoBurnout> analisarRisco(@PathVariable UUID estudanteId) {
        return ResponseEntity.ok(analisarUseCase.executar(estudanteId));
    }
}
