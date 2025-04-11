/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author David
 */
package com.abrilcodes.pos.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "products") // Nombre de la tabla en MySQL

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "product_name") // Mapeo explícito
    private String productName;

    @Column(name = "product_code")
    private String productCode;

    // Relaciones con carga LAZY:
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductPrice> prices;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductStock> stocks;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductDiscount> productDiscounts;
}