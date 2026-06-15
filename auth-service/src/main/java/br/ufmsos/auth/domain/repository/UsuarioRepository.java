package br.ufmsos.auth.domain.repository;

import br.ufmsos.auth.domain.model.Usuario;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository {
    Usuario salvar(Usuario usuario);
    Optional<Usuario> buscarPorEmail(String email);
    boolean existePorEmail(String email);
}
