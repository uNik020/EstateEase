package com.edubridge.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edubridge.Entity.User;
import com.edubridge.exception.DuplicateEntryException;
import com.edubridge.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository=userRepository;
	}
	
	@Override 
	public User registerUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateEntryException("Email already exists: " + user.getEmail());
        }
		if (userRepository.existsByPhone(user.getPhone())) {
            throw new DuplicateEntryException("Phone number already exists: " + user.getPhone());
        }
		return userRepository.save(user);
	}
	
	@Override
	public User loginUser(String email,String password) {
		 User user = userRepository.findByEmail(email);
		    if (user != null && user.getPassword().equals(password)) {
		        return user;  // Return the full user object
		    }
		    return null;  // Invalid login 
	}
	
	@Override
	public User findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}
	
	@Override
	public User updateUser(int id, User user) {
		// TODO Auto-generated method stub
		User user1 = getUserById(id);
		
		user1.setUsername(user.getUsername());
		user1.setEmail(user.getEmail());
		user1.setPhone(user.getPhone());
		user1.setPassword(user.getPassword());
		
		return userRepository.save(user1);	
	}
	
	@Override
	public User getUserById(int id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id);
	}

	@Override
	public List<User> deleteUserById(int id) {
		// TODO Auto-generated method stub
		User user1=getUserById(id);
		userRepository.deleteById(user1.getUserId());
		return userRepository.findAll();
	}

	@Override
	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	public User findById(Long userId) {
		// TODO Auto-generated method stub
		Optional<User> userOptional = userRepository.findById(userId);
	    return userOptional.orElse(null);
	}

}
