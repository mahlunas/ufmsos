package br.ufmsos.financeiro.application.usecase;

import br.ufmsos.financeiro.domain.model.CategoriaFinanceira;
import br.ufmsos.financeiro.domain.repository.CategoriaRepository;

import java.util.List;

public class GerenciarCategoriasUseCase {
    private final CategoriaRepository repository;

    public GerenciarCategoriasUseCase(CategoriaRepository repository) {
        this.repository = repository;
    }

    public CategoriaFinanceira cadastrar(String nome, String cor) {
        return repository.salvar(new CategoriaFinanceira(null, nome, cor));
    }

    public List<CategoriaFinanceira> listar() {
        return repository.listarTodas();
    }
}
