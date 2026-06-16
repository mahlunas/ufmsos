package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Avaliacao;
import br.ufmsos.estudos.domain.model.Disciplina;
import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.AvaliacaoRepository;
import br.ufmsos.estudos.domain.repository.DisciplinaRepository;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;

import java.util.*;
import java.util.stream.Collectors;

public class ConsultarGradeCurricularUseCase {
    private final EstudanteRepository estudanteRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final AvaliacaoRepository avaliacaoRepository;

    public ConsultarGradeCurricularUseCase(
            EstudanteRepository estudanteRepository,
            DisciplinaRepository disciplinaRepository,
            AvaliacaoRepository avaliacaoRepository) {
        this.estudanteRepository = estudanteRepository;
        this.disciplinaRepository = disciplinaRepository;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public Map<Integer, List<DisciplinaGridDTO>> executar(UUID estudanteId) {
        // 1. Fetch student
        Estudante estudante = estudanteRepository.buscarPorId(estudanteId)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado com o ID: " + estudanteId));

        UUID cursoId = estudante.cursoId();
        Integer semestreAtual = estudante.semestreAtual() != null ? estudante.semestreAtual() : 1;

        // 2. Fetch all disciplines of the course
        List<Disciplina> disciplinas = disciplinaRepository.buscarPorCurso(cursoId);

        // Map disciplines by their code for quick lookup
        Map<String, Disciplina> disciplinasPorCodigo = disciplinas.stream()
                .collect(Collectors.toMap(Disciplina::codigo, d -> d, (d1, d2) -> d1));

        // 3. Fetch all student's evaluations
        List<Avaliacao> avaliacoes = avaliacaoRepository.buscarPorEstudante(estudanteId);

        // Group evaluations by discipline and calculate average grade
        Map<UUID, List<Avaliacao>> avaliacoesPorDisciplina = avaliacoes.stream()
                .filter(a -> a.disciplinaId() != null)
                .collect(Collectors.groupingBy(Avaliacao::disciplinaId));

        Map<UUID, Double> mediaPorDisciplina = new HashMap<>();
        for (Map.Entry<UUID, List<Avaliacao>> entry : avaliacoesPorDisciplina.entrySet()) {
            List<Avaliacao> list = entry.getValue();
            double sum = 0.0;
            int count = 0;
            for (Avaliacao a : list) {
                if (a.notaObtida() != null) {
                    sum += a.notaObtida();
                    count++;
                }
            }
            if (count > 0) {
                mediaPorDisciplina.put(entry.getKey(), sum / count);
            }
        }

        // Set of completed discipline UUIDs (grade >= 6.0)
        Set<UUID> concluidas = new HashSet<>();
        for (Map.Entry<UUID, Double> entry : mediaPorDisciplina.entrySet()) {
            if (entry.getValue() >= 6.0) {
                concluidas.add(entry.getKey());
            }
        }

        // Helper to check if a discipline code is completed by the student
        // A prerequisite code matches a discipline in the course. We check if that discipline's UUID is in the completed set.
        java.util.function.BiFunction<String, Map<String, Disciplina>, Boolean> isPrereqMet = (code, codeMap) -> {
            Disciplina prereq = codeMap.get(code);
            if (prereq == null) {
                return true; // If prerequisite discipline doesn't exist in the course grid, ignore it
            }
            return concluidas.contains(prereq.id());
        };

        // 4. Construct the Grid DTOs
        List<DisciplinaGridDTO> gridDTOs = new ArrayList<>();
        for (Disciplina d : disciplinas) {
            List<String> preRequisitosList = new ArrayList<>();
            List<String> materiasTrancando = new ArrayList<>();

            if (d.preRequisito() != null && !d.preRequisito().isBlank()) {
                for (String pcode : d.preRequisito().split(",")) {
                    pcode = pcode.strip();
                    if (!pcode.isEmpty()) {
                        preRequisitosList.add(pcode);
                        // Check if completed
                        if (!isPrereqMet.apply(pcode, disciplinasPorCodigo)) {
                            Disciplina prereqDisc = disciplinasPorCodigo.get(pcode);
                            String prereqName = prereqDisc != null ? prereqDisc.nome() : "Desconhecido";
                            materiasTrancando.add(pcode + " - " + prereqName);
                        }
                    }
                }
            }

            // Determine status
            String status;
            if (concluidas.contains(d.id())) {
                status = "CONCLUIDA";
            } else if (!materiasTrancando.isEmpty()) {
                status = "TRANCADA";
            } else if (d.semestre() != null && d.semestre().equals(semestreAtual)) {
                status = "CURSANDO";
            } else {
                status = "DISPONIVEL";
            }

            gridDTOs.add(new DisciplinaGridDTO(
                    d.id(),
                    d.nome(),
                    d.codigo(),
                    d.cargaHoraria(),
                    d.semestre() != null ? d.semestre() : 1,
                    preRequisitosList,
                    status,
                    materiasTrancando,
                    mediaPorDisciplina.get(d.id())
            ));
        }

        // 5. Group by semester and sort by name
        Map<Integer, List<DisciplinaGridDTO>> grouped = gridDTOs.stream()
                .collect(Collectors.groupingBy(DisciplinaGridDTO::semestre));

        // Sort the list of each semester by name
        for (Map.Entry<Integer, List<DisciplinaGridDTO>> entry : grouped.entrySet()) {
            entry.getValue().sort(Comparator.comparing(DisciplinaGridDTO::nome));
        }

        return grouped;
    }
}
