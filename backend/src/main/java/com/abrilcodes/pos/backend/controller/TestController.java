package com.abrilcodes.pos.backend.controller;

import com.abrilcodes.pos.backend.repository.ProductRepository;
import com.abrilcodes.pos.backend.repository.UserRepository;
import com.abrilcodes.pos.backend.model.Product;
import com.abrilcodes.pos.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    
    public TestController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Map<String, Object>>> getAllProducts() {
        List<Product> products = productRepository.findAllProductsOnly();
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (Product p : products) {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("productId", p.getProductId());
            productMap.put("productName", p.getProductName());
            productMap.put("productCode", p.getProductCode());
            result.add(productMap);
        }
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/debug")
    public ResponseEntity<String> debugProducts() {
        List<Product> products = productRepository.findAll();
        StringBuilder debug = new StringBuilder();
        
        debug.append("Total de productos encontrados: ").append(products.size()).append("\n");
        
        for (Product p : products) {
            debug.append("ID: ").append(p.getProductId())
                 .append(", Nombre: ").append(p.getProductName())
                 .append(", Código: ").append(p.getProductCode())
                 .append("\n");
        }
        
        System.out.println(debug.toString());
        return ResponseEntity.ok(debug.toString());
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (User u : users) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("userId", u.getUserId());
            userMap.put("username", u.getUsername());
            userMap.put("firstName", u.getFirstName());
            if (u.getRole() != null) {
                userMap.put("roleName", u.getRole().getRoleName());
            } else {
                userMap.put("roleName", "Sin rol");
            }
            result.add(userMap);
        }
        
        return ResponseEntity.ok(result);
    }
}