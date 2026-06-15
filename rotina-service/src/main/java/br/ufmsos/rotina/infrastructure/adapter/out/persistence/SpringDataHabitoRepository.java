package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SpringDataHabitoRepository extends JpaRepository<HabitoEntity, UUID> {
    List<HabitoEntity> findByEstudanteId(UUID estudanteId);
}
