package com.abrilcodes.pos.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String username;
    private String password;
}
