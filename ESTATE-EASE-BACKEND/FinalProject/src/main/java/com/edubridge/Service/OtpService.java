package com.edubridge.Service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    // A map to store OTPs against email addresses
    private final Map<String, String> otpData = new HashMap<>();

    // Generate an OTP and associate it with the provided email
    public String generateOtp(String email) {
        Random random = new Random();
        String otp = String.format("%04d", random.nextInt(10000));
        otpData.put(email, otp);
        // Here you would typically send the OTP to the user's email
        return otp;
    }

    // Verify the provided OTP against the stored one
    public boolean verifyOtp(String email, String otp) {
        if (otpData.containsKey(email) && otpData.get(email).equals(otp)) {
            otpData.remove(email); // OTP can only be used once
            return true;
        }
        return false;
    }
}
