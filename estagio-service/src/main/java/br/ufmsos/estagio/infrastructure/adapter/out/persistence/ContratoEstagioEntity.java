package br.ufmsos.estagio.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "contrato_estagio")
@Getter
@Setter
@NoArgsConstructor
public class ContratoEstagioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String empresaNome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Integer cargaHorariaSemanal;
    private UUID estudanteId;
    private boolean ativo;

    public ContratoEstagioEntity(UUID id, String empresaNome, LocalDate dataInicio, LocalDate dataFim, Integer cargaHorariaSemanal, UUID estudanteId, boolean ativo) {
        this.id = id;
        this.empresaNome = empresaNome;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.cargaHorariaSemanal = cargaHorariaSemanal;
        this.estudanteId = estudanteId;
        this.ativo = ativo;
    }
}
