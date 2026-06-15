package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "disciplina")
@Getter
@Setter
@NoArgsConstructor
public class DisciplinaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome;
    private String codigo;
    private Integer cargaHoraria;
    private UUID cursoId;

    public DisciplinaEntity(UUID id, String nome, String codigo, Integer cargaHoraria, UUID cursoId) {
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.cargaHoraria = cargaHoraria;
        this.cursoId = cursoId;
    }
}
