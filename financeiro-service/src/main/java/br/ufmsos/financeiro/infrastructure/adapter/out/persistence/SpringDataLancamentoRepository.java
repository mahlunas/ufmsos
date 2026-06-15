package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface SpringDataLancamentoRepository extends JpaRepository<LancamentoEntity, UUID> {
    List<LancamentoEntity> findByEstudanteId(UUID estudanteId);
    List<LancamentoEntity> findByEstudanteIdAndDataPagamentoBetween(UUID estudanteId, LocalDate inicio, LocalDate fim);
}
