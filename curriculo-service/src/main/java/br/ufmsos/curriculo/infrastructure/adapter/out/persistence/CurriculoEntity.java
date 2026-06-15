package br.ufmsos.curriculo.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "curriculo")
@Getter
@Setter
@NoArgsConstructor
public class CurriculoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    private String nomeCompleto;
    
    @Column(columnDefinition = "TEXT")
    private String objetivo;

    @ElementCollection
    private List<String> competencias;

    @ElementCollection
    private List<String> experiencias;

    private UUID estudanteId;

    public CurriculoEntity(UUID id, String nomeCompleto, String objetivo, List<String> competencias, List<String> experiencias, UUID estudanteId) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.objetivo = objetivo;
        this.competencias = competencias;
        this.experiencias = experiencias;
        this.estudanteId = estudanteId;
    }
}
