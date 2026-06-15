package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "revisao")
@Getter
@Setter
@NoArgsConstructor
public class RevisaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID avaliacaoId;
    private LocalDateTime dataHora;
    private Integer duracaoMinutos;
    private UUID estudanteId;

    public RevisaoEntity(UUID id, UUID avaliacaoId, LocalDateTime dataHora, Integer duracaoMinutos, UUID estudanteId) {
        this.id = id;
        this.avaliacaoId = avaliacaoId;
        this.dataHora = dataHora;
        this.duracaoMinutos = duracaoMinutos;
        this.estudanteId = estudanteId;
    }
}
