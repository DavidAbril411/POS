package com.abrilcodes.pos.backend.repository;

import com.abrilcodes.pos.backend.model.Role;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends BaseRepository<Role, Long> {
    Role findByRoleName(String roleName);
    Optional<Role> findById(Long id);
}