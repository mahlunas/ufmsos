package br.ufmsos.curriculo.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SpringDataCurriculoRepository extends JpaRepository<CurriculoEntity, UUID> {
    Optional<CurriculoEntity> findByEstudanteId(UUID estudanteId);
}
