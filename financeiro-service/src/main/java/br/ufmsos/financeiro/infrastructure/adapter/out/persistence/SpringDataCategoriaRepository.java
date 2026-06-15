package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SpringDataCategoriaRepository extends JpaRepository<CategoriaEntity, UUID> {
}
