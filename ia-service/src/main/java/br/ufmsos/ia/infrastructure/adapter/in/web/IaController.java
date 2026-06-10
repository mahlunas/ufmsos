package br.ufmsos.ia.infrastructure.adapter.in.web;

import br.ufmsos.ia.application.service.AgenteIAService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/ia")
public class IaController {

    private final AgenteIAService agenteIAService;

    public IaController(AgenteIAService agenteIAService) {
        this.agenteIAService = agenteIAService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String mensagem) {
        return agenteIAService.conversar(mensagem);
    }
}
