package br.ufmsos.financeiro.infrastructure.adapter.in.web;

import br.ufmsos.financeiro.application.usecase.*;
import br.ufmsos.financeiro.domain.model.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/financeiro")
public class FinanceiroController {

    private final RegistrarLancamentoUseCase registrarLancamentoUseCase;
    private final GerenciarCategoriasUseCase categoriasUseCase;
    private final ConsultarResumoFinanceiroUseCase resumoUseCase;

    public FinanceiroController(
            RegistrarLancamentoUseCase registrarLancamentoUseCase,
            GerenciarCategoriasUseCase categoriasUseCase,
            ConsultarResumoFinanceiroUseCase resumoUseCase) {
        this.registrarLancamentoUseCase = registrarLancamentoUseCase;
        this.categoriasUseCase = categoriasUseCase;
        this.resumoUseCase = resumoUseCase;
    }

    @PostMapping("/lancamentos")
    public ResponseEntity<LancamentoFinanceiro> registrar(@RequestBody @Valid LancamentoFinanceiro lancamento) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registrarLancamentoUseCase.executar(lancamento));
    }

    @GetMapping("/resumo/{estudanteId}")
    public ResumoFinanceiro obterResumo(@PathVariable UUID estudanteId) {
        return resumoUseCase.executar(estudanteId);
    }

    @PostMapping("/categorias")
    public CategoriaFinanceira criarCategoria(@RequestBody CategoriaRequest request) {
        return categoriasUseCase.cadastrar(request.nome(), request.cor());
    }

    @GetMapping("/categorias")
    public List<CategoriaFinanceira> listarCategorias() {
        return categoriasUseCase.listar();
    }

    public record CategoriaRequest(String nome, String cor) {}
}
