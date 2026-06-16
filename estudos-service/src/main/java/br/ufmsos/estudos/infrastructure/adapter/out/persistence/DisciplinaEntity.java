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
    private Integer semestre;
    @Column(name = "pre_requisito")
    private String preRequisito;

    public DisciplinaEntity(UUID id, String nome, String codigo, Integer cargaHoraria, UUID cursoId) {
        this(id, nome, codigo, cargaHoraria, cursoId, 1, null);
    }

    public DisciplinaEntity(UUID id, String nome, String codigo, Integer cargaHoraria, UUID cursoId, Integer semestre, String preRequisito) {
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.cargaHoraria = cargaHoraria;
        this.cursoId = cursoId;
        this.semestre = semestre;
        this.preRequisito = preRequisito;
    }
}
