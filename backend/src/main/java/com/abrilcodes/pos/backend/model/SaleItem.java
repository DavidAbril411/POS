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

@Data
@Entity
@Table(name = "sale_items")
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;
    
    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    @Column(name = "quantity")
    private Integer quantity;
}