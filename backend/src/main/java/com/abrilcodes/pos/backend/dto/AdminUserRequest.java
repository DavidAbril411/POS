package com.abrilcodes.pos.backend.dto;

import lombok.Data;

@Data
public class AdminUserRequest {
    private String firstName;
    private String username;
    private String password;
}
