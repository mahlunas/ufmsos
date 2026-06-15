package br.ufmsos.auth.application.usecase;

import br.ufmsos.auth.domain.model.Usuario;
import br.ufmsos.auth.domain.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

public class AutenticarUsuarioUseCase {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AutenticarUsuarioUseCase(final UsuarioRepository repository, final PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Usuario> executar(final String email, final String senha) {
        return repository.buscarPorEmail(email)
                .filter(usuario -> passwordEncoder.matches(senha, usuario.senhaHash()));
    }
}
