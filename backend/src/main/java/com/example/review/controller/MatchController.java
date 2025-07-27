// backend/src/main/java/com/example/review/controller/MatchController.java
package com.example.review.controller;

import com.example.review.entity.Match;
import com.example.review.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {
    
    @Autowired
    private MatchRepository matchRepository;
    
    @GetMapping("/champions-league")
    public ResponseEntity<?> getChampionsLeagueMatches() {
        try {
            List<Match> matches = matchRepository.findByCompetitionOrderByMatchDateDesc("UEFA Champions League");
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
}