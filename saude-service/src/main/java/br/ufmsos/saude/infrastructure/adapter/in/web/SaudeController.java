package br.ufmsos.saude.infrastructure.adapter.in.web;

import br.ufmsos.saude.application.usecase.RegistrarBemEstarUseCase;
import br.ufmsos.saude.domain.model.RegistroBemEstar;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/saude")
public class SaudeController {
    private final RegistrarBemEstarUseCase useCase;
    public SaudeController(RegistrarBemEstarUseCase useCase) { this.useCase = useCase; }

    @PostMapping
    public ResponseEntity<RegistroBemEstar> registrar(@RequestBody @Valid RegistroBemEstar registro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(useCase.executar(registro));
    }
}
