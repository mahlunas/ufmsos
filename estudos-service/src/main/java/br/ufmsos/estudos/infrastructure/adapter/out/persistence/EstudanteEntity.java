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

    @Column(name = "ano_ingresso")
    private Integer anoIngresso;

    @Column(name = "semestre_ingresso")
    private Integer semestreIngresso;

    @Column(name = "forma_calculo_semestre")
    private String formaCalculoSemestre;

    public EstudanteEntity(UUID id, String nomeCompleto, String matricula, String email, UUID cursoId, String senhaHash, Integer semestreAtual) {
        this(id, nomeCompleto, matricula, email, cursoId, senhaHash, semestreAtual, 2026, 1, "MANUAL");
    }

    public EstudanteEntity(UUID id, String nomeCompleto, String matricula, String email, UUID cursoId, String senhaHash, Integer semestreAtual, Integer anoIngresso, Integer semestreIngresso, String formaCalculoSemestre) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.matricula = matricula;
        this.email = email;
        this.cursoId = cursoId;
        this.senhaHash = senhaHash;
        this.semestreAtual = semestreAtual;
        this.anoIngresso = anoIngresso;
        this.semestreIngresso = semestreIngresso;
        this.formaCalculoSemestre = formaCalculoSemestre;
    }
}
