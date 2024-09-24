package com.edubridge.Service;

import java.util.List;
import java.util.Optional;

import com.edubridge.Entity.User;

public interface UserService {

	public User registerUser(User user);

	public User loginUser(String email,String password);

	public User updateUser(int id,User user);
	
	public User findByEmail(String email);

	public User getUserById(int id);

	public List<User> deleteUserById(int id);

	public User getUserByUsername(String username);

	public User findById(Long userId);

}
