package br.ufmsos.estagio.application.usecase;

import br.ufmsos.estagio.domain.model.ContratoEstagio;

/**
 * Caso de Uso para verificar se o estudante tem direito a redução de carga horária.
 * (Lei 11.788/2008 Art. 10 § 2º: redução de pelo menos 50% em períodos de avaliação).
 */
public class VerificarProtecaoAvaliacaoUseCase {

    public boolean deveReduzirCarga(boolean isSemanaDeProvas) {
        return isSemanaDeProvas;
    }

    public int calcularCargaReduzida(ContratoEstagio contrato) {
        return contrato.cargaHorariaSemanal() / 2;
    }
}
