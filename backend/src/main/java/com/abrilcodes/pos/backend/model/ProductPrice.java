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
@Table(name = "product_prices")
public class ProductPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_id")
    private Long priceId;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    @Column(name = "effective_date")
    private Date effectiveDate;
    
    @Column(name = "price")
    private Float price;
}
