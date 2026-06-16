package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "estudante")
@Getter
@Setter
@NoArgsConstructor
public class EstudanteEntity {
    @Id
    private UUID id;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true)
    private String matricula;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "curso_id")
    private UUID cursoId;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Column(name = "semestre_atual")
    private Integer semestreAtual;

    public EstudanteEntity(UUID id, String nomeCompleto, String matricula, String email, UUID cursoId, String senhaHash, Integer semestreAtual) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.matricula = matricula;
        this.email = email;
        this.cursoId = cursoId;
        this.senhaHash = senhaHash;
        this.semestreAtual = semestreAtual;
    }
}
