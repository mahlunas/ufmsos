package br.ufmsos.curriculo.application.usecase;

import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayOutputStream;
import java.util.UUID;

@Slf4j
public class GerarCurriculoPdfUseCase {

    private final CurriculoRepository repository;

    public GerarCurriculoPdfUseCase(CurriculoRepository repository) {
        this.repository = repository;
    }

    public byte[] executar(UUID estudanteId) {
        log.info("Gerando PDF para o estudante: {}", estudanteId);
        
        Curriculo curriculo = repository.buscarPorEstudante(estudanteId)
                .orElseThrow(() -> new RuntimeException("Currículo não encontrado para o estudante ID: " + estudanteId));

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);

            document.open();

            // Fonte para título
            Font fontTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph titulo = new Paragraph("CURRÍCULO VITAE", fontTitulo);
            titulo.setAlignment(Element.ALIGN_CENTER);
            titulo.setSpacingAfter(20);
            document.add(titulo);

            // Nome Completo
            Font fontSubtitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            document.add(new Paragraph(curriculo.nomeCompleto(), fontSubtitulo));
            document.add(new Paragraph(" "));

            // Objetivo
            document.add(new Paragraph("OBJETIVO", fontSubtitulo));
            document.add(new Paragraph(curriculo.objetivo()));
            document.add(new Paragraph(" "));

            // Competências
            document.add(new Paragraph("COMPETÊNCIAS", fontSubtitulo));
            com.lowagie.text.List listComp = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED);
            curriculo.competencias().forEach(c -> listComp.add(new ListItem(c)));
            document.add(listComp);
            document.add(new Paragraph(" "));

            // Experiências
            document.add(new Paragraph("EXPERIÊNCIAS PROFISSIONAIS", fontSubtitulo));
            com.lowagie.text.List listExp = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED);
            curriculo.experiencias().forEach(e -> listExp.add(new ListItem(e)));
            document.add(listExp);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            log.error("Erro ao gerar PDF", e);
            throw new RuntimeException("Erro ao gerar PDF do currículo.", e);
        }
    }
}
