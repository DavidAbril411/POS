package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.SaleDiscount;
import com.abrilcodes.pos.backend.model.SaleDiscount.SaleDiscountId;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleDiscountRepository extends BaseRepository<SaleDiscount, SaleDiscountId> {
    List<SaleDiscount> findBySaleSaleId(Integer saleId);
    List<SaleDiscount> findByDiscountDiscountId(Integer discountId);
}