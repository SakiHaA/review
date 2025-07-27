package com.example.review.service;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.review.security.JwtUtil;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;

//import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.security.Key;

// import java.util.function.Function;

@Service
public class JwtService {
    @Autowired
    private JwtUtil jwtUtil;

    Map<String, Object> claims = new HashMap<>();

    public String generateToken(String email) {
        return jwtUtil.createToken(claims, email);
    }

    // ログイン時トークンページでメールアドレスを抽出しようとした
    // public String extractEmail(String token) {
    //     return jwtUtil.extractEmail(token);
    // }
} 