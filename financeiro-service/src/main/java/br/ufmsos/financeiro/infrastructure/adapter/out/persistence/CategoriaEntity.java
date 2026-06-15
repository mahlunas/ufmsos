package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "categoria_financeira")
@Getter
@Setter
@NoArgsConstructor
public class CategoriaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false, unique = true)
    private String nome;
    
    private String corIcone;

    public CategoriaEntity(UUID id, String nome, String corIcone) {
        this.id = id;
        this.nome = nome;
        this.corIcone = corIcone;
    }
}
