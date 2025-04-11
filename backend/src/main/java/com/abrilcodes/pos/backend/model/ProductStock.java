/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import java.sql.Date;
import lombok.Data;

@Data
@Entity
@Table(name = "product_stock")
public class ProductStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Long stockId;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    @Column(name = "last_updated")
    private Date lastUpdated;
    
    @Column(name = "quantity")
    private Float quantity;
    
    @Column(name = "measure_unit")
    private String measureUnit;
}