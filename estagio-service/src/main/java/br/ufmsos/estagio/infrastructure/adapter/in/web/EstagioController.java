package br.ufmsos.estagio.infrastructure.adapter.in.web;

import br.ufmsos.estagio.application.usecase.RegistrarContratoEstagioUseCase;
import br.ufmsos.estagio.domain.model.ContratoEstagio;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/estagios/contratos")
public class EstagioController {

    private final RegistrarContratoEstagioUseCase registrarContratoEstagioUseCase;

    public EstagioController(final RegistrarContratoEstagioUseCase registrarContratoEstagioUseCase) {
        this.registrarContratoEstagioUseCase = registrarContratoEstagioUseCase;
    }

    @PostMapping
    public ResponseEntity<ContratoEstagio> registrar(@RequestBody @Valid ContratoRequest request) {
        final var contrato = new ContratoEstagio(
            UUID.randomUUID(),
            request.empresaNome(),
            request.dataInicio(),
            request.dataFim(),
            request.cargaHorariaSemanal(),
            request.estudanteId(),
            true
        );
        final var salvo = registrarContratoEstagioUseCase.executar(contrato);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    public record ContratoRequest(
        @NotBlank(message = "Nome da empresa é obrigatório") String empresaNome,
        @NotNull(message = "Data de início é obrigatória") LocalDate dataInicio,
        LocalDate dataFim,
        @NotNull(message = "Carga horária é obrigatória") @Positive(message = "Carga horária deve ser positiva") @Max(value = 30, message = "Carga horária não pode exceder 30 horas") Integer cargaHorariaSemanal,
        @NotNull(message = "ID do estudante é obrigatório") UUID estudanteId
    ) {}
}
