package br.ufmsos.estagio.application.usecase;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.model.ProjecaoRecesso;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class ProjetarRecessoUseCase {

    public ProjecaoRecesso executar(ContratoEstagio contrato) {
        final var inicio = contrato.dataInicio();
        final var hoje = LocalDate.now();
        
        // Lei do Estágio: 30 dias a cada 12 meses (2.5 dias por mês)
        long mesesTrabalhados = ChronoUnit.MONTHS.between(inicio, hoje);
        if (mesesTrabalhados < 0) mesesTrabalhados = 0;
        
        int diasDireito = (int) (mesesTrabalhados * 2.5);
        
        return new ProjecaoRecesso(
            inicio.plusMonths(12),
            diasDireito,
            "Baseado em " + mesesTrabalhados + " meses de contrato ativo."
        );
    }
}
