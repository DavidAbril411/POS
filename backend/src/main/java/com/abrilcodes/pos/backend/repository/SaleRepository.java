package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SaleRepository extends BaseRepository<Sale, Integer> {
    List<Sale> findByUserUserId(Long userId);
    List<Sale> findBySaleDateBetween(Date startDate, Date endDate);
    
    @Query("SELECT s FROM Sale s WHERE s.total > ?1")
    List<Sale> findSalesWithTotalGreaterThan(Float amount);
}