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
import java.sql.Date;
import lombok.Data;

@Data
@Entity
@Table(name = "amount_status")
public class AmountStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Integer statusId;

    @Column(name = "status")
    private Boolean status; // tinyint(1) → boolean
    
    @Column(name = "payment_date")
    private Date paymentDate;
    
    @Column(name = "next_payment_date")
    private Date nextPaymentDate;
    
    @Column(name = "amount")
    private Integer amount;
}