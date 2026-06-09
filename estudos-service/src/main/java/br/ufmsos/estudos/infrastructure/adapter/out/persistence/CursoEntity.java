package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

/**
 * Entidade JPA para persistência de Cursos.
 */
@Entity
@Table(name = "curso")
@Getter
@Setter
@NoArgsConstructor
public class CursoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(name = "unidade_academica")
    private String unidadeAcademica;

    public CursoEntity(UUID id, String nome, String unidadeAcademica) {
        this.id = id;
        this.nome = nome;
        this.unidadeAcademica = unidadeAcademica;
    }
}
