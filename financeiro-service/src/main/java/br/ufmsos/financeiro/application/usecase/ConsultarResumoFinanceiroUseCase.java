package br.ufmsos.financeiro.application.usecase;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import br.ufmsos.financeiro.domain.model.ResumoFinanceiro;
import br.ufmsos.financeiro.domain.model.TipoLancamentoEnum;
import br.ufmsos.financeiro.domain.repository.CategoriaRepository;
import br.ufmsos.financeiro.domain.repository.LancamentoRepository;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ConsultarResumoFinanceiroUseCase {
    private final LancamentoRepository lancamentoRepository;
    private final CategoriaRepository categoriaRepository;

    public ConsultarResumoFinanceiroUseCase(LancamentoRepository lancamentoRepository, CategoriaRepository categoriaRepository) {
        this.lancamentoRepository = lancamentoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public ResumoFinanceiro executar(UUID estudanteId) {
        final var lancamentos = lancamentoRepository.listarPorEstudante(estudanteId);
        
        BigDecimal totalReceitas = BigDecimal.ZERO;
        BigDecimal totalDespesas = BigDecimal.ZERO;
        Map<String, BigDecimal> gastosPorCategoria = new HashMap<>();

        for (var l : lancamentos) {
            if (l.tipo() == TipoLancamentoEnum.RECEITA) {
                totalReceitas = totalReceitas.add(l.valor());
            } else {
                totalDespesas = totalDespesas.add(l.valor());
                
                // Agrupa gastos por categoria
                final String nomeCat = categoriaRepository.buscarPorId(l.categoriaId())
                        .map(c -> c.nome())
                        .orElse("Geral");
                
                gastosPorCategoria.merge(nomeCat, l.valor(), BigDecimal::add);
            }
        }

        return new ResumoFinanceiro(
                estudanteId,
                totalReceitas.subtract(totalDespesas),
                totalReceitas,
                totalDespesas,
                gastosPorCategoria
        );
    }
}
