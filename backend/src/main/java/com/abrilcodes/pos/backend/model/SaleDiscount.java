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
@Table(name = "sale_discounts")
public class SaleDiscount {
    @EmbeddedId
    private SaleDiscountId id;
    
    @ManyToOne
    @MapsId("saleId")
    @JoinColumn(name = "sale_id")
    private Sale sale;
    
    @ManyToOne
    @MapsId("discountId")
    @JoinColumn(name = "discount_id")
    private Discount discount;
    
    // Clave compuesta: sale_id + discount_id
    @Data
    @Embeddable
    public static class SaleDiscountId implements Serializable {
        @Column(name = "sale_id")
        private Integer saleId;
        
        @Column(name = "discount_id")
        private Integer discountId;
        
        // Constructor por defecto requerido por JPA
        public SaleDiscountId() {}
        
        // Constructor con parámetros
        public SaleDiscountId(Integer saleId, Integer discountId) {
            this.saleId = saleId;
            this.discountId = discountId;
        }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SaleDiscountId that = (SaleDiscountId) o;
            return Objects.equals(saleId, that.saleId) && 
                   Objects.equals(discountId, that.discountId);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(saleId, discountId);
        }
    }
}