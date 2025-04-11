package com.abrilcodes.pos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
    // Métodos comunes para todos los repositorios pueden ir aquí
}