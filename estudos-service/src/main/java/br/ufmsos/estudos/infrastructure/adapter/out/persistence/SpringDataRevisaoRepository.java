package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SpringDataRevisaoRepository extends JpaRepository<RevisaoEntity, UUID> {
    List<RevisaoEntity> findByEstudanteId(UUID estudanteId);
    List<RevisaoEntity> findByAvaliacaoId(UUID avaliacaoId);
}
