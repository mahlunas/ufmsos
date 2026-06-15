package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface SpringDataRegistroHabitoRepository extends JpaRepository<RegistroHabitoEntity, UUID> {
    List<RegistroHabitoEntity> findByHabitoIdAndDataConclusaoBetween(UUID habitoId, LocalDateTime inicio, LocalDateTime fim);
}
