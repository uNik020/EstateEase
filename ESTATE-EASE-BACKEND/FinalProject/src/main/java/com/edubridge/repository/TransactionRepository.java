package com.edubridge.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edubridge.Entity.Transaction;
import com.edubridge.Entity.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByOwner(User owner);
	
	  // Custom query to find transactions where the user is either the owner or buyer
    @Query("SELECT t FROM Transaction t WHERE t.owner.id = :userId OR t.buyer.id = :userId")
    List<Transaction> findByUserInvolved(Long userId);
	
	@Query("SELECT t FROM Transaction t WHERE t.owner.id = :userId")
    List<Transaction> findByOwnerId(@Param("userId") Long userId);

	List<Transaction> findByPaymentStatus(String paymentStatus);
	
	List<Transaction> findByDateBetween(LocalDate startDate,LocalDate endDate);
}