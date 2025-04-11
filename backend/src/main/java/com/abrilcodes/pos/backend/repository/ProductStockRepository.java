package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.ProductStock;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductStockRepository extends BaseRepository<ProductStock, Long> {
    List<ProductStock> findByProductProductId(Integer productId);
    Optional<ProductStock> findFirstByProductProductIdOrderByLastUpdatedDesc(Integer productId);
    List<ProductStock> findByQuantityLessThan(Float minQuantity);
}