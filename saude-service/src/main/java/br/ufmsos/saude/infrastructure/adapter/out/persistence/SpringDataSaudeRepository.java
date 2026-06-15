package br.ufmsos.saude.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.UUID;

public interface SpringDataSaudeRepository extends JpaRepository<RegistroBemEstarEntity, UUID> {
    @Query("SELECT r FROM RegistroBemEstarEntity r WHERE r.estudanteId = :estudanteId ORDER BY r.dataRegistro DESC")
    List<RegistroBemEstarEntity> findTopNByEstudanteId(UUID estudanteId, org.springframework.data.domain.Pageable pageable);
}
