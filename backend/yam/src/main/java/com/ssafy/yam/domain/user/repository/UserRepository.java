package com.ssafy.yam.domain.user.repository;

import com.ssafy.yam.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.stream.DoubleStream;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> getUserByUserEmail(String username);

    boolean existsByUserEmail(String email);

    public Optional<User> findByUserEmail(String username);

}
