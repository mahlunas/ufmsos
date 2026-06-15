package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "habito")
@Getter
@Setter
@NoArgsConstructor
public class HabitoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome;
    private int frequenciaDiaria;
    private UUID estudanteId;

    public HabitoEntity(UUID id, String nome, int frequenciaDiaria, UUID estudanteId) {
        this.id = id;
        this.nome = nome;
        this.frequenciaDiaria = frequenciaDiaria;
        this.estudanteId = estudanteId;
    }
}
