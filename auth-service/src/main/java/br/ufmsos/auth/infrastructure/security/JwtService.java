package br.ufmsos.auth.infrastructure.security;

import br.ufmsos.auth.domain.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@lombok.extern.slf4j.Slf4j
public class JwtService {

    @Value("${app.security.jwt.secret:5a57afc4b448c0289f736c9dbf82c4963d2274c362bd633813c4d391834e7ead}")
    private String secretKey;

    @Value("${app.security.jwt.expiration:86400000}") // 24 hours
    private long expiration;

    public String gerarToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("nome", usuario.nome());
        claims.put("id", usuario.id().toString());
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.email())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}
