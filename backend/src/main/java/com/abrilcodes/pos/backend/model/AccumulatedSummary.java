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
@Table(name = "accumulated_summary")
public class AccumulatedSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summary_id")
    private Long summaryId;
    
    @Column(name = "total_sales")
    private Float totalSales;
    
    @Column(name = "total_inventory_purchases")
    private Float totalInventoryPurchases;
    
    @Column(name = "total_resources_paid")
    private Float totalResourcesPaid;
    
    @Column(name = "gross_profit")
    private Float grossProfit;
    
    @Column(name = "net_profit")
    private Float netProfit;
    
    @Column(name = "sales_count")
    private Integer salesCount;
}