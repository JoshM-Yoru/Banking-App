package com.banking.app.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.app.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  
  Optional<User> getByEmail(String email);
  User findByUserId(UUID userId);
}
