package com.edubridge.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.edubridge.Entity.Transaction;
import com.edubridge.Entity.User;

public interface TransactionService {

//	public Transaction createTransaction(Transaction transaction);
//
//	public List<Transaction> getAllTransactions();
//
//	public Transaction getTransactionById(Long transactionId);
//
//	public Transaction updateTransaction(Long transactionId, Transaction transactionDetails);
//
//	public ResponseEntity<String> deleteTransaction(Long transactionId);
//
//	public List<Transaction> getTransactionsByOwnerId(Long ownerId);
//	
//	 // Add this method to create Razorpay order
//    public String createRazorpayOrder(Long transactionId) throws Exception;
	
	 // Create or update a transaction
    public Transaction saveTransaction(Transaction transaction);

    // Find transactions by owner
    public List<Transaction> findByOwner(User owner);
    
    public List<Transaction> findByOwnerId(Long userId);
    
    public Optional<Transaction> findById(Long transactionId);

    public void deleteTransaction(Long transactionId);

    public List<Transaction> findByPaymentStatus(String paymentStatus);

    public List<Transaction> findByDateRange(LocalDate startDate, LocalDate endDate);
    
 // Method to get transactions where the user is involved
    List<Transaction> getUserTransactions(Long userId);

}
