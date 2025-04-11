package com.abrilcodes.pos.backend.controller;

import com.abrilcodes.pos.backend.dto.AdminUserRequest;
import com.abrilcodes.pos.backend.dto.UserResponse;
import com.abrilcodes.pos.backend.model.User;
import com.abrilcodes.pos.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        
        List<UserResponse> userResponses = users.stream()
            .map(user -> UserResponse.builder()
                .id(user.getUserId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .role(user.getRole().getRoleName())
                .build())
            .collect(Collectors.toList());
            
        return ResponseEntity.ok(userResponses);
    }
    
    @PostMapping("/admin")
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<?> createAdminUser(@RequestBody AdminUserRequest request) {
        try {
            User createdUser = userService.createAdminUser(request);
            
            UserResponse response = UserResponse.builder()
                .id(createdUser.getUserId())
                .username(createdUser.getUsername())
                .firstName(createdUser.getFirstName())
                .role(createdUser.getRole().getRoleName())
                .build();
                
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Usuario eliminado exitosamente"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
}
