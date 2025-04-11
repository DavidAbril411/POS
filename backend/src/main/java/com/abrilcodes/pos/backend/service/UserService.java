package com.abrilcodes.pos.backend.service;

import com.abrilcodes.pos.backend.dto.AdminUserRequest;
import com.abrilcodes.pos.backend.model.Role;
import com.abrilcodes.pos.backend.model.User;
import com.abrilcodes.pos.backend.repository.RoleRepository;
import com.abrilcodes.pos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserService(UserRepository userRepository,
                      RoleRepository roleRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User createAdminUser(AdminUserRequest request) {
        // Verificar si el usuario ya existe
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }
        
        // Crear un nuevo usuario administrador
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setUsername(request.getUsername());
        
        // Cifrar la contraseña
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        
        // Establecer fecha actual como fecha de inicio
        user.setStartDate(new Date(System.currentTimeMillis()));
        
        // Asignar rol de Administrador
        Role adminRole = roleRepository.findByRoleName("Administrador")
            .orElseThrow(() -> new RuntimeException("Rol de administrador no encontrado"));
        user.setRole(adminRole);
        
        // Guardar y devolver el usuario
        return userRepository.save(user);
    }
    
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Verificar que no sea el último administrador
        if (user.getRole().getRoleName().equals("Administrador")) {
            long adminCount = userRepository.findAll().stream()
                .filter(u -> u.getRole().getRoleName().equals("Administrador"))
                .count();
                
            if (adminCount <= 1) {
                throw new RuntimeException("No se puede eliminar el último administrador del sistema");
            }
        }
        
        userRepository.delete(user);
    }
}
