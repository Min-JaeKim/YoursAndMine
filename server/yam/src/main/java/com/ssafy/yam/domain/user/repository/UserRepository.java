package com.ssafy.yam.domain.user.repository;

import com.ssafy.yam.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserEmail(String UserEmail);

    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findByUserId(int userId);

}
