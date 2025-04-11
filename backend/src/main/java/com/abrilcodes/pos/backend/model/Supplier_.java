/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "suppliers")
public class Supplier_ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private Integer supplierId;
    
    @Column(name = "supplier_name")
    private String supplierName;
}