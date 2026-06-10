package br.ufmsos.auth.infrastructure.adapter.out.persistence;

import br.ufmsos.auth.domain.model.Usuario;
import br.ufmsos.auth.domain.repository.UsuarioRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

@Component
public class JpaUsuarioRepositoryAdapter implements UsuarioRepository {
    private final SpringDataUsuarioRepository repository;

    public JpaUsuarioRepositoryAdapter(final SpringDataUsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public Usuario salvar(final Usuario usuario) {
        final var entity = new UsuarioEntity(usuario.id(), usuario.nome(), usuario.email(), usuario.senhaHash());
        final var saved = repository.save(entity);
        return new Usuario(saved.getId(), saved.getNome(), saved.getEmail(), saved.getSenhaHash());
    }

    @Override
    public Optional<Usuario> buscarPorEmail(final String email) {
        return repository.findByEmail(email).map(e -> new Usuario(e.getId(), e.getNome(), e.getEmail(), e.getSenhaHash()));
    }

    @Override
    public boolean existePorEmail(final String email) {
        return repository.existsByEmail(email);
    }
}
