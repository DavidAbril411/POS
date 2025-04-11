package com.abrilcodes.pos.backend.controller;

import com.abrilcodes.pos.backend.dto.LoginRequest;
import com.abrilcodes.pos.backend.dto.LoginResponse;
import com.abrilcodes.pos.backend.dto.RegisterRequest;
import com.abrilcodes.pos.backend.model.User;
import com.abrilcodes.pos.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*") // Permite solicitudes de cualquier origen
public class AuthController {

    private final AuthService authService;
    
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Error en login: " + e.getMessage());
            throw e;
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request);
            
            // Crear una respuesta más detallada
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuario registrado exitosamente");
            response.put("userId", user.getUserId());
            response.put("username", user.getUsername());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Error en register: " + e.getMessage());
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Endpoint básico para pruebas
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth endpoint funcionando correctamente");
    }
}