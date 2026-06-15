package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SpringDataCursoRepository extends JpaRepository<CursoEntity, UUID> {
    boolean existsByNome(String nome);
}
