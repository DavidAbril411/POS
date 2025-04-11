/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import java.io.Serializable;
import lombok.Data;
import java.util.Objects;

@Data
@Entity
@Table(name = "salary_amount_status")
public class SalaryAmountStatus {
    @EmbeddedId
    private SalaryAmountStatusId id;
    
    @ManyToOne
    @MapsId("salaryId")
    @JoinColumn(name = "salary_id")
    private Salary salary;
    
    @ManyToOne
    @MapsId("amountStatusId")
    @JoinColumn(name = "amount_status_id")
    private AmountStatus amountStatus;
    
    // Clave compuesta: salary_id + amount_status_id
    @Data
    @Embeddable
    public static class SalaryAmountStatusId implements Serializable {
        @Column(name = "salary_id")
        private Integer salaryId;
        
        @Column(name = "amount_status_id")
        private Integer amountStatusId;
        
        // Constructor por defecto requerido por JPA
        public SalaryAmountStatusId() {}
        
        // Constructor con parámetros
        public SalaryAmountStatusId(Integer salaryId, Integer amountStatusId) {
            this.salaryId = salaryId;
            this.amountStatusId = amountStatusId;
        }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SalaryAmountStatusId that = (SalaryAmountStatusId) o;
            return Objects.equals(salaryId, that.salaryId) && 
                   Objects.equals(amountStatusId, that.amountStatusId);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(salaryId, amountStatusId);
        }
    }
}
