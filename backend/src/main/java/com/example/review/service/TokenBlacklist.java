package com.example.review.service;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class TokenBlacklist { 
    private Set<String> blacklistedTokens = new HashSet<>();

    public void addToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}