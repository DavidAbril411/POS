package com.abrilcodes.pos.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Acceso concedido al panel de Administrador");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}