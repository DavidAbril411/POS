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
import java.util.List;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId; 
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "start_date")
    private Date startDate;
    
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    
    // Relaciones:
    @OneToMany(mappedBy = "user")
    private List<Sale> sales;
    
    @OneToMany(mappedBy = "employee")
    private List<Salary> salaries;
}