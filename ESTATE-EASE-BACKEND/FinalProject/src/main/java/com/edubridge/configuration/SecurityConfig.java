//package com.edubridge.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf
//                .disable() // Disable CSRF protection if needed
//            )
//            .authorizeHttpRequests(authorize -> authorize
//                .requestMatchers("/api/user/login").permitAll() // Allow access to the login page
//                .requestMatchers("/api/user/user-details").authenticated() // Require authentication for this endpoint
//                .requestMatchers("/api/properties/create").authenticated() // Require authentication for this endpoint
//                .anyRequest().permitAll() // Allow all other requests
//            )
//            .formLogin(formLogin ->
//                formLogin
//                    .loginProcessingUrl("/api/user/login") // Handle login form submissions
//                    .defaultSuccessUrl("/api/user/user-details") // Redirect on successful login
//                    .permitAll()
//            )
//            .logout(logout ->
//                logout
//                    .permitAll()
//            );
//
//        return http.build();
//    }
//
//    @Bean
//    PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
