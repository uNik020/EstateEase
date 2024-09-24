package com.edubridge.controller;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.Transaction;
import com.edubridge.Entity.User;
import com.edubridge.Service.PropertyService;
import com.edubridge.Service.TransactionService;
import com.edubridge.Service.UserService;
import com.edubridge.repository.TransactionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private TransactionRepository transactionRepository;

    // Get transactions by owner
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Transaction>> getTransactionsByOwner(@PathVariable Long ownerId) {
        List<Transaction> transactions = transactionService.findByOwnerId(ownerId);
        return ResponseEntity.ok(transactions);
    }

    // Get transaction by ID
    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long transactionId) {
        Optional<Transaction> optionalTransaction = transactionService.findById(transactionId);
        
        if (optionalTransaction.isPresent()) {
            return ResponseEntity.ok(optionalTransaction.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Endpoint to fetch transactions where the user is either the buyer or the owner
    @GetMapping("/user/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
        return transactionService.getUserTransactions(userId);
    }

    // Delete a transaction
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long transactionId) {
        transactionService.deleteTransaction(transactionId);
        return ResponseEntity.noContent().build();
    }

    // Get transactions by payment status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Transaction>> getTransactionsByStatus(@PathVariable String status) {
        List<Transaction> transactions = transactionService.findByPaymentStatus(status);
        return ResponseEntity.ok(transactions);
    }

    // Get transactions by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Transaction>> getTransactionsByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<Transaction> transactions = transactionService.findByDateRange(start, end);
        return ResponseEntity.ok(transactions);
    }
    
    
    // Create or update a transaction
    @PostMapping("/save")
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction) {
    	Transaction savedTransaction = transactionService.saveTransaction(transaction);
    	return ResponseEntity.ok(savedTransaction);
    }

    
  //Razorpay
    @GetMapping("/createRazorpayOrder/{amount}/{propertyId}")
    public ResponseEntity<Map<String, Object>> createRazorpayOrder(@PathVariable("amount") double amount, @PathVariable("propertyId") Long propertyId, @RequestHeader(value = "Buyer-Id", required = false) Long buyerId) throws RazorpayException {
    	
    	// Set the buyer as the logged-in user
        User buyer = userService.findById(buyerId);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        System.out.println("buyer details are as follows:..............................." +buyer);
        
        // Instantiate RazorpayClient
        RazorpayClient razorpayClient = new RazorpayClient("rzp_test_DWE7Q9vgAOh4if", "dJ9WMtJKdYC3jKbq9X8bEX2v");

        // Create a JSON object for the order request
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Convert amount to paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis()); // Unique receipt ID

        // Create the order in Razorpay
        Order order = razorpayClient.Orders.create(orderRequest);

        // Retrieve the property using the propertyId
        Property property = propertyService.findPropertyById(propertyId);
        if (property == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        // Set the owner as the property's owner
        User owner = property.getUser();  
        if (owner == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        System.out.println("###################################################################################################################################");//correct
        
        System.out.println(property);//correct
        System.out.println(buyer);//correct
        System.out.println(owner);//correct
        System.out.println("###################################################################################################################################");//correct

        // Create the transaction and save details
        Transaction transaction = new Transaction();
        transaction.setBuyer(buyer);
        transaction.setOwner(owner);
        transaction.setPropertyId(propertyId);
        transaction.setAmount(amount);
        transaction.setRazorpayPaymentId(order.get("id").toString()); // Using the Razorpay Order ID
        //transaction.setPaymentStatus(transaction.getPaymentStatus());
        transaction.setDate(LocalDate.now());
        transaction.setTime(LocalTime.now());
     
//        String razorpayOrderId = (String) order.get("razorpay_order_id");
//        String razorpaySignature = (String) order.get("razorpay_signature");
//        // Check for null values before setting them
//        if (razorpayOrderId != null && razorpaySignature != null) {
//            transaction.setRazorpayOrderId(razorpayOrderId);
//            transaction.setRazorpaySignature(razorpaySignature);
//        } else {
//            // Handle the case where the values are null
//            System.err.println("Razorpay Order ID or Signature is null");
//            // You may want to throw an exception or set default values
//        }
        // Save the transaction
        //transactionService.saveTransaction(transaction); //this is saving transaction details before savetransaction method
        System.out.println(transaction);//testing
        

        // Update the property status to sold/unavailable
        property.setPropertyStatus("SOLD");  // or "unavailable" based on your requirement
        propertyService.saveProperty(property);  // Save the updated property

        // Convert the Razorpay ORDER response to a Map for easier JSON serialization
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("receipt", order.get("receipt"));
        response.put("created_at", order.get("created_at"));
//        response.put("razorpay_order_id", order.get("razorpay_order_id"));
//        response.put("razorpay_signature", order.get("razorpay_signature"));        
//        response.put("transactionId", transaction.getTransactionId()); // Optionally, return the transaction ID
//        response.put("paymentStatus",transaction.getPaymentStatus());
//        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping("/createRazorpayOrder/{amount}")
//    public ResponseEntity<Map<String, Object>> createRazorpayOrder(@PathVariable("amount") Double amount) throws RazorpayException {
//        
//        // Instantiate RazorpayClient
//        RazorpayClient razorpayClient = new RazorpayClient("rzp_test_DWE7Q9vgAOh4if", "dJ9WMtJKdYC3jKbq9X8bEX2v");
//
//        // Create a JSON object for the order request
//        JSONObject orderRequest = new JSONObject();
//        orderRequest.put("amount", amount * 100); // Convert amount to paise
//        orderRequest.put("currency", "INR");
//        orderRequest.put("receipt", "txn_" + System.currentTimeMillis()); // Unique receipt ID
//
//        // Create the order
//        Order order = razorpayClient.Orders.create(orderRequest);
//
//        // Convert the Razorpay order response to a Map for easier JSON serialization
//        Map<String, Object> response = new HashMap<>();
//        response.put("id", order.get("id"));
//        response.put("amount", order.get("amount"));
//        response.put("currency", order.get("currency"));
//        response.put("receipt", order.get("receipt"));
//        response.put("created_at", order.get("created_at"));
//
//        // Return the response as JSON
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//    
//razorpay mastercard- 5267 3181 8797 5449
//    @PostMapping("/verifyPayment")
//    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> data) {
//        try {
//            String razorpayOrderId = data.get("razorpay_order_id").toString();
//            String razorpayPaymentId = data.get("razorpay_payment_id").toString();
//            String razorpaySignature = data.get("razorpay_signature").toString();
//
//            // Verify the signature using Razorpay
//            JSONObject options = new JSONObject();
//            options.put("razorpay_order_id", razorpayOrderId);
//            options.put("razorpay_payment_id", razorpayPaymentId);
//            options.put("razorpay_signature", razorpaySignature);
//
//            boolean isValidSignature = Utils.verifyPaymentSignature(options, "dJ9WMtJKdYC3jKbq9X8bEX2v");
//
//            if (isValidSignature) {
//                // Extract purchasedPropertyId from the data map
//                Long purchasedPropertyId = Long.parseLong(data.get("purchasedPropertyId").toString());
//                double amount = Double.parseDouble(data.get("amount").toString());
//
//                System.out.println("Fetching property with ID: " + purchasedPropertyId);
//                // Fetch the property details using the ID
//                Property property = propertyService.findPropertyById(purchasedPropertyId);
//                if (property == null) {
//                    return new ResponseEntity<>("Property not found", HttpStatus.BAD_REQUEST);
//                }
//                System.out.println("Property fetched: " + property.getPropertyId());
//                
//                // Set the buyer as the logged-in user
//                User buyer = userService.getLoggedInUser();
//                if (buyer == null) {
//                    return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
//                }
//                System.out.println("Logged-in user: " + buyer.getUserId());
//                
//                // Set the owner as the property's owner
//                User owner = property.getUser();  // Assuming property has the correct owner info
//                if (owner == null) {
//                    return new ResponseEntity<>("Property owner not found", HttpStatus.BAD_REQUEST);
//                }
//
//                // Log the values to ensure they're correct before saving
//                System.out.println("Buyer: " + buyer.getUserId() + ", Owner: " + owner.getUserId() + ", Property: " + property.getPropertyId() + ", Amount: " + amount);
//
//                // Create and save the transaction
//                Transaction transaction = new Transaction();
//                transaction.setBuyer(buyer);
//                transaction.setOwner(owner);
//                transaction.setProperty(property);
//                transaction.setAmount(amount);
//                transaction.setRazorpayPaymentId(razorpayPaymentId);
//                transaction.setRazorpayOrderId(razorpayOrderId);
//                transaction.setRazorpaySignature(razorpaySignature);
//                transaction.setPaymentStatus("SUCCESS");
//                transaction.setDate(LocalDate.now());
//                transaction.setTime(LocalTime.now());
//
//                // Save the transaction
//                transactionService.saveTransaction(transaction);
//
//                return new ResponseEntity<>("Payment verification successful", HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Invalid payment signature", HttpStatus.BAD_REQUEST);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();  // Log the exception for debugging
//            return new ResponseEntity<>("Payment verification failed", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}




//
//import com.edubridge.Entity.Transaction;
//import com.edubridge.Entity.User;
//import com.edubridge.Service.TransactionService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("api/transaction")
//@CrossOrigin(origins="http://localhost:4200")
//public class TransactionController {
//
//	@Autowired
//	private TransactionService transactionService;
//
////	@PostMapping("/create")
////	public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) 
////	{
////		Transaction createdTransaction = transactionService.createTransaction(transaction);
////		return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
////	}
//	
//	 // Add this method to create Razorpay order and initiate the payment
//    @PostMapping("/create-payment/{transactionId}")
//    public ResponseEntity<String> createPaymentOrder(@PathVariable Long transactionId) {
//        try {
//            // Call service to create Razorpay order
//            String orderId = transactionService.createRazorpayOrder(transactionId);
//            return new ResponseEntity<>(orderId, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>("Error creating Razorpay order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//
//	@GetMapping("/all") 
//	public ResponseEntity<List<Transaction>>getAllTransactions() 
//	{ 
//		// Get all transactions 
//		List<Transaction> transactions = transactionService.getAllTransactions(); 
//		return new ResponseEntity<>(transactions, HttpStatus.OK); 
//	}
//
//	@GetMapping("/{transactionId}")
//	public ResponseEntity<Transaction> getTransactionById(@PathVariable Long transactionId) {
//		Transaction transaction = transactionService.getTransactionById(transactionId);
//		if (transaction != null) {
//			return new ResponseEntity<>(transaction, HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}
//	
//	 @GetMapping("/user/{ownerId}")
//	    public List<Transaction> getTransactionsByOwner(@PathVariable Long userId) {
//	        return transactionService.getTransactionsByOwnerId(userId);
//	    }
//
//	@PutMapping("/update/{transactionId}")
//	public ResponseEntity<Transaction> updateTransaction(
//
//			@PathVariable Long transactionId,
//
//			@RequestBody Transaction transactionDetails) {
//		Transaction updatedTransaction = transactionService.updateTransaction(transactionId, transactionDetails);
//		return ResponseEntity.ok(updatedTransaction);
//	}
//
//	@DeleteMapping("/{transactionId}")
//	public ResponseEntity<String> deleteTransaction(@PathVariable Long transactionId) {
//		transactionService.deleteTransaction(transactionId);
//		String successMessage = "Transaction with ID " + transactionId + " has been successfully deleted.";
//		return new ResponseEntity<>(successMessage, HttpStatus.OK);
//	}
//}
