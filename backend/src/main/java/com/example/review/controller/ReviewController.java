package com.example.review.controller;

import org.springframework.web.bind.annotation.*;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import com.example.review.entity.Review;
// import com.example.review.entity.User;
// import com.example.review.entity.Match;
// import com.example.review.repository.ReviewRepository;
// import com.example.review.repository.UserRepository;
// import com.example.review.repository.MatchRepository;
// import com.example.review.service.JwtService;

@RestController
@RequestMapping("/api/user/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    // @Autowired
    // private ReviewRepository reviewRepository;

    // @Autowired
    // private UserRepository userRepository;
    
    
    
    // @GetMapping("/{matchId}/reviews")
    // public ResponseEntity<?> getReviews(@PathVariable Long matchId) {
    //     try {
    //         List<Review> reviews = reviewRepository.findByIdOrderByCreatedAtDesc(matchId);
    //         return ResponseEntity.ok(reviews);
    //     } catch (Exception e) {
    //         Map<String, String> error = new HashMap<>();
    //         error.put("error", e.getMessage());
    //         return ResponseEntity.badRequest().body(error);
    //     }
    // }

    // @PostMapping("/{matchId}/reviews")
    // public ResponseEntity<?> createReview(
    //         @PathVariable Long matchId,
    //         @RequestBody Map<String, Object> reviewData,
    //         @RequestHeader("Authorization") String authHeader) {
    //     try {
    //         // JWTトークンからユーザー情報を取得
    //         String token = authHeader.replace("Bearer ", "");
    //         String userEmail = jwtService.getEmailFromToken(token);
            
    //         Optional<User> userOpt = userRepository.findByEmail(userEmail);
    //         if (!userOpt.isPresent()) {
    //             return ResponseEntity.badRequest().body(Map.of("error", "ユーザーが見つかりません"));
    //         }
            
    //         Optional<Match> matchOpt = matchRepository.findById(matchId);
    //         if (!matchOpt.isPresent()) {
    //             return ResponseEntity.badRequest().body(Map.of("error", "試合が見つかりません"));
    //         }
    //         Review review = new Review();
    //         review.setMatch(matchOpt.get());
    //         review.setUser(userOpt.get());
    //         review.setRating((Integer) reviewData.get("rating"));
    //         review.setComment((String) reviewData.get("comment"));
            
    //         Review savedReview = reviewRepository.save(review);
    //         return ResponseEntity.ok(savedReview);
            
    //     } catch (Exception e) {
    //         Map<String, String> error = new HashMap<>();
    //         error.put("error", e.getMessage());
    //         return ResponseEntity.badRequest().body(error);
    //     }
    // }
}