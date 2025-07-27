// backend/src/main/java/com/example/review/controller/AutoRegisterController.java
package com.example.review.controller;

import com.example.review.service.AutoRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AutoRegisterController {
    
    @Autowired
    private AutoRegisterService autoRegisterService;
    
    @PostMapping("/autoregister")
    public ResponseEntity<?> autoRegisterChampionsLeague() {
        try {
            AutoRegisterService.AutoRegisterResult result = 
                autoRegisterService.registerChampionsLeagueMatches();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", result.message);
            response.put("totalMatches", result.totalMatches);
            response.put("registeredMatches", result.registeredMatches);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
