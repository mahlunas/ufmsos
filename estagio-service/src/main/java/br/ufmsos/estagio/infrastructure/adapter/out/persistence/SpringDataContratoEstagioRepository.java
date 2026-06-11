package br.ufmsos.estagio.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SpringDataContratoEstagioRepository extends JpaRepository<ContratoEstagioEntity, UUID> {
}
