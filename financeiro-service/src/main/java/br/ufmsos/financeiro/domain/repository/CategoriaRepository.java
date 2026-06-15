package br.ufmsos.financeiro.domain.repository;

import br.ufmsos.financeiro.domain.model.CategoriaFinanceira;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoriaRepository {
    CategoriaFinanceira salvar(CategoriaFinanceira categoria);
    Optional<CategoriaFinanceira> buscarPorId(UUID id);
    List<CategoriaFinanceira> listarTodas();
}
