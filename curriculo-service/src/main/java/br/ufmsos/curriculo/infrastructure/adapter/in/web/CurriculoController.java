package br.ufmsos.curriculo.infrastructure.adapter.in.web;

import br.ufmsos.curriculo.application.usecase.GerarCurriculoPdfUseCase;
import br.ufmsos.curriculo.application.usecase.GerarCurriculoUseCase;
import br.ufmsos.curriculo.application.usecase.SalvarCurriculoUseCase;
import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {

    private final GerarCurriculoUseCase gerarCurriculoUseCase;
    private final GerarCurriculoPdfUseCase gerarCurriculoPdfUseCase;
    private final SalvarCurriculoUseCase salvarCurriculoUseCase;
    private final CurriculoRepository repository;

    public CurriculoController(GerarCurriculoUseCase gerarCurriculoUseCase, 
                               GerarCurriculoPdfUseCase gerarCurriculoPdfUseCase, 
                               SalvarCurriculoUseCase salvarCurriculoUseCase,
                               CurriculoRepository repository) {
        this.gerarCurriculoUseCase = gerarCurriculoUseCase;
        this.gerarCurriculoPdfUseCase = gerarCurriculoPdfUseCase;
        this.salvarCurriculoUseCase = salvarCurriculoUseCase;
        this.repository = repository;
    }

    @GetMapping("/me")
    public ResponseEntity<Curriculo> obterMeuCurriculo() {
        UUID usuarioId = getUsuarioIdAutenticado();
        return repository.buscarPorEstudante(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me")
    public ResponseEntity<Curriculo> salvarMeuCurriculo(@RequestBody SalvarRequest request) {
        UUID usuarioId = getUsuarioIdAutenticado();
        Curriculo salvo = salvarCurriculoUseCase.executar(
                usuarioId,
                request.nomeCompleto(),
                request.objetivo(),
                request.competencias(),
                request.experiencias()
        );
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/me/pdf")
    public ResponseEntity<byte[]> baixarMeuPdf() {
        UUID usuarioId = getUsuarioIdAutenticado();
        byte[] pdfBytes = gerarCurriculoPdfUseCase.executar(usuarioId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "curriculo.pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    @PostMapping("/gerar")
    public ResponseEntity<String> solicitarGeracao(@RequestBody Curriculo curriculo) {
        gerarCurriculoUseCase.solicitarGeracao(curriculo);
        return ResponseEntity.accepted().body("Geração de currículo iniciada. Você receberá um alerta quando estiver pronto.");
    }

    @GetMapping("/{estudanteId}/pdf")
    public ResponseEntity<byte[]> baixarPdf(@PathVariable UUID estudanteId) {
        byte[] pdfBytes = gerarCurriculoPdfUseCase.executar(estudanteId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "curriculo.pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    @GetMapping("/{estudanteId}")
    public ResponseEntity<Curriculo> obterCurriculo(@PathVariable UUID estudanteId) {
        return repository.buscarPorEstudante(estudanteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private UUID getUsuarioIdAutenticado() {
        Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (details instanceof String) {
            return UUID.fromString((String) details);
        }
        throw new RuntimeException("Usuário não autenticado corretamente (ID ausente no token).");
    }

    public record SalvarRequest(
            String nomeCompleto,
            String objetivo,
            List<String> competencias,
            List<String> experiencias
    ) {}
}
