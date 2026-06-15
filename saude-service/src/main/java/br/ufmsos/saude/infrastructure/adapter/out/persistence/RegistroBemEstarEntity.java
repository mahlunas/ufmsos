package br.ufmsos.saude.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registro_bem_estar")
@Getter
@Setter
@NoArgsConstructor
public class RegistroBemEstarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int nivelHumor;
    private int nivelExaustao;
    private String observacao;
    private LocalDateTime dataRegistro;
    private UUID estudanteId;

    public RegistroBemEstarEntity(UUID id, int nivelHumor, int nivelExaustao, String observacao, LocalDateTime dataRegistro, UUID estudanteId) {
        this.id = id;
        this.nivelHumor = nivelHumor;
        this.nivelExaustao = nivelExaustao;
        this.observacao = observacao;
        this.dataRegistro = dataRegistro;
        this.estudanteId = estudanteId;
    }
}
