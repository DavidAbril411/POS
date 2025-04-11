/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Integer saleId; 
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "sale_date")
    private Date saleDate;
    
    @Column(name = "total")
    private Float total;
    
    // Relaciones:
    @OneToMany(mappedBy = "sale")
    private List<SaleItem> items;
    
    @ManyToMany
    @JoinTable(
        name = "sale_discounts",
        joinColumns = @JoinColumn(name = "sale_id"),
        inverseJoinColumns = @JoinColumn(name = "discount_id")
    )
    private List<Discount> discounts;
}