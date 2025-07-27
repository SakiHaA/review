package com.example.review.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByIdOrderByCreatedAtDesc(Long matchId);
}
