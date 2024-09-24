package com.edubridge.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.Transaction;
import com.edubridge.Entity.User;
import com.edubridge.exception.ResourceNotFoundException;
import com.edubridge.repository.PropertyRepository;
import com.edubridge.repository.TransactionRepository;
import com.edubridge.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;

@Service
public class TransactionServiceImpl implements TransactionService {
	@Autowired
    private TransactionRepository transactionRepository;
	@Autowired
	private PropertyRepository propertyRepository;
	@Autowired
	private UserRepository userRepository;

    // Create or update a transaction
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Find transactions by owner
    public List<Transaction> findByOwner(User owner) {
        return transactionRepository.findByOwner(owner);
    }

    // Find transactions by owner ID
    public List<Transaction> findByOwnerId(Long userId) {
        return transactionRepository.findByOwnerId(userId);
    }

    // Find a transaction by ID
    public Optional<Transaction> findById(Long transactionId) {
        return transactionRepository.findById(transactionId);
    }

    // Delete a transaction by ID
    public void deleteTransaction(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    // Find transactions by payment status
    public List<Transaction> findByPaymentStatus(String paymentStatus) {
        return transactionRepository.findByPaymentStatus(paymentStatus);
    }

    // Find transactions by date range
    public List<Transaction> findByDateRange(LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByDateBetween(startDate, endDate);
    }
    
    @Override
    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserInvolved(userId); // Fetch transactions where user is involved
    }
	
	
}
	
//
//    @Autowired
//    private TransactionRepository transactionRepository;
//
//    @Autowired
//    private RazorpayClient razorpayClient;
//
//    @Override
//    public Transaction createTransaction(Transaction transaction) {
//        // Existing code to create transaction...
//        return transactionRepository.save(transaction);
//    }
//
//    @Override
//    public String createRazorpayOrder(Long transactionId) throws Exception {
//        // Fetch the transaction details
//        Transaction transaction = transactionRepository.findById(transactionId)
//            .orElseThrow(() -> new RuntimeException("Transaction not found"));
//
//        // Create Razorpay order request
//        JSONObject options = new JSONObject();
//        options.put("amount", transaction.getAmount() * 100); // Amount in paise (multiply by 100)
//        options.put("currency", "INR");
//        options.put("receipt", "txn_" + transactionId);
//        options.put("payment_capture", 1); // Auto capture after payment success
//
//        // Create the order
//        Order order = razorpayClient.Orders.create(options);
//
//        // Return the Razorpay order ID to the frontend
//        return order.get("id");
//    }
//
//    @Override
//    public List<Transaction> getAllTransactions() {
//        return transactionRepository.findAll();
//    }
//
//    @Override
//    public Transaction getTransactionById(Long transactionId) {
//        return transactionRepository.findById(transactionId)
//            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + transactionId));
//    }
//
//    @Override
//    public Transaction updateTransaction(Long transactionId, Transaction transactionDetails) {
//        Transaction existingTransaction = transactionRepository.findById(transactionId)
//            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + transactionId));
//
//        // Update only the non-null fields
//        if (transactionDetails.getAmount() != null) {
//            existingTransaction.setAmount(transactionDetails.getAmount());
//        }
//        if (transactionDetails.getBuyer() != null && transactionDetails.getBuyer().getUserId() != null) {
//            existingTransaction.setBuyer(transactionDetails.getBuyer());
//        }
//        if (transactionDetails.getOwner() != null && transactionDetails.getOwner().getUserId() != null) {
//            existingTransaction.setOwner(transactionDetails.getOwner());
//        }
//
//        return transactionRepository.save(existingTransaction);
//    }
//
//    @Override
//    public ResponseEntity<String> deleteTransaction(Long transactionId) {
//        Transaction transaction = transactionRepository.findById(transactionId)
//            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + transactionId));
//        
//        transactionRepository.delete(transaction);
//        return new ResponseEntity<>("Transaction deleted successfully", HttpStatus.OK);
//    }
//
//    @Override
//    public List<Transaction> getTransactionsByOwnerId(Long userId) {
//        // Fetch the User entity by userId
//        // Fetch transactions by owner
//        return transactionRepository.findByOwnerId(userId);
//    }

