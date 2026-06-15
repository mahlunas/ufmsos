package br.ufmsos.saude.domain.repository;
import br.ufmsos.saude.domain.model.RegistroBemEstar;
public interface RegistroBemEstarRepository {
    RegistroBemEstar salvar(RegistroBemEstar registro);
    java.util.List<RegistroBemEstar> buscarUltimosPorEstudante(java.util.UUID estudanteId, int limite);
}
