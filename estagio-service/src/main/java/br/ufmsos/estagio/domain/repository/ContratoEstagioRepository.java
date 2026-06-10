package br.ufmsos.estagio.domain.repository;

import br.ufmsos.estagio.domain.model.ContratoEstagio;
import java.util.UUID;

public interface ContratoEstagioRepository {
    ContratoEstagio salvar(ContratoEstagio contrato);
}
