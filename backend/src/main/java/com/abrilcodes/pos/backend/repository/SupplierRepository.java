package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Supplier_;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends BaseRepository<Supplier_, Integer> {
    List<Supplier_> findBySupplierNameContainingIgnoreCase(String name);
}