package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "lancamento_financeiro")
@Getter
@Setter
@NoArgsConstructor
public class LancamentoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String descricao;
    private BigDecimal valor;
    private String tipo;
    private LocalDate dataPagamento;
    private UUID estudanteId;
    private UUID categoriaId;

    public LancamentoEntity(UUID id, String descricao, BigDecimal valor, String tipo, LocalDate dataPagamento, UUID estudanteId, UUID categoriaId) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.dataPagamento = dataPagamento;
        this.estudanteId = estudanteId;
        this.categoriaId = categoriaId;
    }
}
