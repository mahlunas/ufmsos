package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registro_habito")
@Getter
@Setter
@NoArgsConstructor
public class RegistroHabitoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID habitoId;
    private LocalDateTime dataConclusao;

    public RegistroHabitoEntity(UUID id, UUID habitoId, LocalDateTime dataConclusao) {
        this.id = id;
        this.habitoId = habitoId;
        this.dataConclusao = dataConclusao;
    }
}
