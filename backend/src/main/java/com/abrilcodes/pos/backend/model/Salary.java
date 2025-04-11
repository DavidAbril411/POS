/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "salaries")
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    private Integer salaryId;
    
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;
    
    @Column(name = "employee_name")
    private String employeeName;
}