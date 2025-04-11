package com.abrilcodes.pos.backend.service;

import com.abrilcodes.pos.backend.dto.LoginRequest;
import com.abrilcodes.pos.backend.dto.LoginResponse;
import com.abrilcodes.pos.backend.dto.RegisterRequest;
import com.abrilcodes.pos.backend.model.Role;
import com.abrilcodes.pos.backend.model.User;
import com.abrilcodes.pos.backend.repository.RoleRepository;
import com.abrilcodes.pos.backend.repository.UserRepository;
import com.abrilcodes.pos.backend.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder,
                      JwtTokenUtil jwtTokenUtil,
                      RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.roleRepository = roleRepository;
    }

    public LoginResponse login(LoginRequest request) {
        try {
            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));
            
            // Verificar la contraseña utilizando el passwordEncoder
            boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
            
            // Si falla la comparación con BCrypt, intentar comparación directa (solo para desarrollo)
            // Esta parte se puede eliminar una vez que todas las contraseñas estén cifradas
            if (!passwordMatches && request.getPassword().equals(user.getPassword())) {
                passwordMatches = true;
                
                // Actualizar la contraseña para cifrarla si era texto plano
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
            }
            
            if (!passwordMatches) {
                throw new BadCredentialsException("Contraseña incorrecta");
            }
            
            // Resto del código sin cambios
            String token = jwtTokenUtil.generateToken(user);
            
            Role userRole = user.getRole();
            String roleName = (userRole != null) ? userRole.getRoleName() : "Sin rol";
            
            return LoginResponse.builder()
                    .token(token)
                    .roleName(roleName)
                    .userId(user.getUserId())
                    .username(user.getUsername())
                    .firstName(user.getFirstName())
                    .build();
        } catch (Exception e) {
            System.out.println("Error en AuthService.login: " + e.getMessage());
            throw e;
        }
    }
    
    public User register(RegisterRequest request) {
        try {
            // Verificar si el usuario ya existe
            if (userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new RuntimeException("El nombre de usuario ya existe");
            }
            
            // Crear un nuevo usuario
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setUsername(request.getUsername());
            
            // Cifrar la contraseña con BCrypt
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            user.setPassword(encodedPassword);
            
            // Establecer fecha actual como fecha de inicio
            user.setStartDate(new Date(System.currentTimeMillis()));
            
            // Asignar rol de EMPLOYEE por defecto
            // Busca el rol con ID 2 (EMPLOYEE) o usa el que corresponda según tu esquema
            Role employeeRole = roleRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Rol de empleado no encontrado"));
            user.setRole(employeeRole);
            
            // Guardar el usuario
            return userRepository.save(user);
        } catch (Exception e) {
            System.out.println("Error en AuthService.register: " + e.getMessage());
            throw e;
        }
    }
}