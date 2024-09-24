package com.edubridge.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

//    @ManyToOne
//    @JoinColumn(name = "property_id", nullable = false) // Ensure this column name matches your database schema
    private Long propertyId;

    private double amount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime time;

    // Payment details
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private String paymentStatus; // e.g., "Pending", "Completed", "Failed"
	public Long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
	public User getOwner() {
		return owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
	public User getBuyer() {
		return buyer;
	}
	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}
	public Long getPropertyId() {
		return propertyId;
	}
	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public String getRazorpayOrderId() {
		return razorpayOrderId;
	}
	public void setRazorpayOrderId(String razorpayOrderId) {
		this.razorpayOrderId = razorpayOrderId;
	}
	public String getRazorpayPaymentId() {
		return razorpayPaymentId;
	}
	public void setRazorpayPaymentId(String razorpayPaymentId) {
		this.razorpayPaymentId = razorpayPaymentId;
	}
	public String getRazorpaySignature() {
		return razorpaySignature;
	}
	public void setRazorpaySignature(String razorpaySignature) {
		this.razorpaySignature = razorpaySignature;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", owner=" + owner + ", buyer=" + buyer + ", propertyId="
				+ propertyId + ", amount=" + amount + ", date=" + date + ", time=" + time + ", razorpayOrderId="
				+ razorpayOrderId + ", razorpayPaymentId=" + razorpayPaymentId + ", razorpaySignature="
				+ razorpaySignature + ", paymentStatus=" + paymentStatus + "]";
	}
	public Transaction(Long transactionId, User owner, User buyer, Long propertyId, double amount, LocalDate date,
			LocalTime time, String razorpayOrderId, String razorpayPaymentId, String razorpaySignature,
			String paymentStatus) {
		super();
		this.transactionId = transactionId;
		this.owner = owner;
		this.buyer = buyer;
		this.propertyId = propertyId;
		this.amount = amount;
		this.date = date;
		this.time = time;
		this.razorpayOrderId = razorpayOrderId;
		this.razorpayPaymentId = razorpayPaymentId;
		this.razorpaySignature = razorpaySignature;
		this.paymentStatus = paymentStatus;
	}
	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}

    
   
}
