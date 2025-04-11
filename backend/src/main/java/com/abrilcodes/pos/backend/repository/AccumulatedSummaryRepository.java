package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.AccumulatedSummary;
import org.springframework.stereotype.Repository;

@Repository
public interface AccumulatedSummaryRepository extends BaseRepository<AccumulatedSummary, Long> {
    // Aquí puedes agregar consultas personalizadas si son necesarias
}