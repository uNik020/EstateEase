package com.edubridge.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edubridge.Entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional <User> findByEmailAndPassword(String email,String password);

	public boolean existsByEmail(String email);

	public boolean existsByPhone(String phone);

	public User findByEmail(String email);

	public User findById(long userId);
	
	public User findByUsername(String username);
}
