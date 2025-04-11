package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends BaseRepository<Product, Integer> {
    List<Product> findByProductNameContainingIgnoreCase(String name);
    List<Product> findByProductCode(String code);
    Optional<Product> findFirstByProductCode(String code);
    
    @Query("SELECT p FROM Product p")
    List<Product> findAllProductsOnly();
}