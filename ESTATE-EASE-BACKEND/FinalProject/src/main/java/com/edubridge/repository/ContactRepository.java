package com.edubridge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edubridge.Entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

	@Query(value = "select * from contact_table where is_active = ?1",nativeQuery = true)
	public List<Contact> findByIsActive(boolean isActive);
}
