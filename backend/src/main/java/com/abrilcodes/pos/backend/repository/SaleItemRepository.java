package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.SaleItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleItemRepository extends BaseRepository<SaleItem, Long> {
    List<SaleItem> findBySaleSaleId(Integer saleId);
    List<SaleItem> findByProductProductId(Integer productId);
    
    @Query("SELECT SUM(si.quantity) FROM SaleItem si WHERE si.product.productId = ?1")
    Integer totalQuantitySoldByProductId(Integer productId);
}