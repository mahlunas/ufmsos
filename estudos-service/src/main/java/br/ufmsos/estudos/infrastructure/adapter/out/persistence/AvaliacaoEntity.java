package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "avaliacao")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome;
    private LocalDateTime dataPrevista;
    private Double notaObtida;
    private UUID estudanteId;
    private UUID disciplinaId;

    public AvaliacaoEntity(UUID id, String nome, LocalDateTime dataPrevista, Double notaObtida, UUID estudanteId, UUID disciplinaId) {
        this.id = id;
        this.nome = nome;
        this.dataPrevista = dataPrevista;
        this.notaObtida = notaObtida;
        this.estudanteId = estudanteId;
        this.disciplinaId = disciplinaId;
    }
}
