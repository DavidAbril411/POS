package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Discount;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface DiscountRepository extends BaseRepository<Discount, Integer> {
    List<Discount> findByStartDateBeforeAndEndDateAfter(Date currentDate, Date currentDate2);
    List<Discount> findByDiscountType(String type);
    List<Discount> findByPercentageGreaterThan(Integer percentage);
}