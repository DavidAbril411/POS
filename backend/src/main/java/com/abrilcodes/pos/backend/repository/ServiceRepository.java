package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Service;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends BaseRepository<Service, Integer> {
    List<Service> findBySupplierSupplierId(Integer supplierId);
    List<Service> findByServiceNameContainingIgnoreCase(String name);
}