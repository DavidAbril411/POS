/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;

import jakarta.persistence.*;
import java.sql.Date;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "discounts")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    private Integer discountId;
    
    @Column(name = "start_date")
    private Date startDate;
    
    @Column(name = "end_date")
    private Date endDate;
    
    @Column(name = "amount")
    private Float amount;
    
    @Column(name = "percentage")
    private Integer percentage;
    
    @Column(name = "discount_type")
    private String discountType;
    
    // Relación many-to-many con Sales
    @ManyToMany(mappedBy = "discounts")
    private List<Sale> sales;
}