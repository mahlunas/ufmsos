package br.ufmsos.financeiro.infrastructure.adapter.in.web;

import br.ufmsos.financeiro.application.usecase.RegistrarLancamentoUseCase;
import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/financeiro/lancamentos")
public class FinanceiroController {

    private final RegistrarLancamentoUseCase registrarLancamentoUseCase;

    public FinanceiroController(final RegistrarLancamentoUseCase registrarLancamentoUseCase) {
        this.registrarLancamentoUseCase = registrarLancamentoUseCase;
    }

    @PostMapping
    public ResponseEntity<LancamentoFinanceiro> registrar(@RequestBody @Valid LancamentoRequest request) {
        final var lancamento = new LancamentoFinanceiro(
            UUID.randomUUID(),
            request.descricao(),
            request.valor(),
            request.tipo(),
            request.dataPagamento() != null ? request.dataPagamento() : LocalDate.now(),
            request.estudanteId(),
            request.categoriaId()
        );
        final var salvo = registrarLancamentoUseCase.executar(lancamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    public record LancamentoRequest(
        @NotBlank(message = "Descrição é obrigatória") String descricao,
        @NotNull(message = "Valor é obrigatório") @Positive(message = "O valor deve ser positivo") BigDecimal valor,
        @NotNull(message = "Tipo é obrigatório") br.ufmsos.financeiro.domain.model.TipoLancamentoEnum tipo,
        LocalDate dataPagamento,
        @NotNull(message = "ID do estudante é obrigatório") UUID estudanteId,
        UUID categoriaId
    ) {}
}
