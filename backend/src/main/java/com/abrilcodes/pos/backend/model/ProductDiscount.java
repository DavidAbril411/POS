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
@Table(name = "product_discounts")
public class ProductDiscount {
    @EmbeddedId
    private ProductDiscountId id;
    
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne
    @MapsId("discountId")
    @JoinColumn(name = "discount_id")
    private Discount discount;
    
    // Clave compuesta: product_id + discount_id
    @Data
    @Embeddable
    public static class ProductDiscountId implements Serializable {
        @Column(name = "product_id")
        private Integer productId;
        
        @Column(name = "discount_id")
        private Integer discountId;
        
        // Constructor por defecto requerido por JPA
        public ProductDiscountId() {}
        
        // Constructor con parámetros
        public ProductDiscountId(Integer productId, Integer discountId) {
            this.productId = productId;
            this.discountId = discountId;
        }
        
        // Equals y HashCode son vitales para claves compuestas
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ProductDiscountId that = (ProductDiscountId) o;
            return Objects.equals(productId, that.productId) && 
                   Objects.equals(discountId, that.discountId);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(productId, discountId);
        }
    }
}