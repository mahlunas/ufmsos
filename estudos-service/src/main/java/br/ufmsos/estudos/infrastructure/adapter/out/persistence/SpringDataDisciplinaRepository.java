package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SpringDataDisciplinaRepository extends JpaRepository<DisciplinaEntity, UUID> {
    boolean existsByCodigo(String codigo);
    java.util.List<DisciplinaEntity> findByCursoId(UUID cursoId);
}
