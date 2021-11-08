package com.ssafy.yam.domain.user.repository;

import com.ssafy.yam.domain.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserEmail(String UserEmail);

    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findByUserId(int userId);

    @EntityGraph(attributePaths = "authorities") // 쿼리가 수행될 때 Lazy 조회가 아니고 Eager 조회로 authorities 정보를 같이 가져온다.
    Optional<User> findOneWithAuthoritiesByUserEmail(String userEmail);
}
