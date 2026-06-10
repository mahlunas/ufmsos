package br.ufmsos.auth.domain.model;

import java.util.UUID;

public record Usuario(
    UUID id,
    String nome,
    String email,
    String senhaHash
) {
    public Usuario {
        if (email == null || !email.contains("@")) throw new IllegalArgumentException("E-mail inválido.");
    }
}
