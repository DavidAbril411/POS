package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByFirstNameContainingIgnoreCase(String firstName);
    List<User> findByRoleRoleId(Byte roleId);
}