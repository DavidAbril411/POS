package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.ProductDiscount;
import com.abrilcodes.pos.backend.model.ProductDiscount.ProductDiscountId;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDiscountRepository extends BaseRepository<ProductDiscount, ProductDiscountId> {
    List<ProductDiscount> findByProductProductId(Integer productId);
    List<ProductDiscount> findByDiscountDiscountId(Integer discountId);
}