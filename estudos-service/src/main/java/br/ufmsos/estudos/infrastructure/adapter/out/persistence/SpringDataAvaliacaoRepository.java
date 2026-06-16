package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SpringDataAvaliacaoRepository extends JpaRepository<AvaliacaoEntity, UUID> {
    List<AvaliacaoEntity> findByEstudanteIdAndDisciplinaId(UUID estudanteId, UUID disciplinaId);
    List<AvaliacaoEntity> findByEstudanteId(UUID estudanteId);
}
