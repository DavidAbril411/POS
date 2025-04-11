/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.abrilcodes.pos.backend.model;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import lombok.Data;

@Data
@Entity
@Table(name = "service_amount_status")
public class ServiceAmountStatus {
    @EmbeddedId
    private ServiceAmountStatusId id;
    
    @ManyToOne
    @MapsId("serviceId")
    @JoinColumn(name = "service_id")
    private Service service;
    
    @ManyToOne
    @MapsId("amountStatusId")
    @JoinColumn(name = "amount_status_id")
    private AmountStatus amountStatus;
    
    // Clave compuesta: service_id + amount_status_id
    @Data
    @Embeddable
    public static class ServiceAmountStatusId implements Serializable {
        @Column(name = "service_id")
        private Integer serviceId;
        
        @Column(name = "amount_status_id")
        private Integer amountStatusId;
        
        // Constructor por defecto requerido por JPA
        public ServiceAmountStatusId() {}
        
        // Constructor con parámetros
        public ServiceAmountStatusId(Integer serviceId, Integer amountStatusId) {
            this.serviceId = serviceId;
            this.amountStatusId = amountStatusId;
        }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ServiceAmountStatusId that = (ServiceAmountStatusId) o;
            return Objects.equals(serviceId, that.serviceId) &&
                   Objects.equals(amountStatusId, that.amountStatusId);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(serviceId, amountStatusId);
        }
    }
}