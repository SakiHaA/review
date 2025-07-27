package com.example.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.review.entity.Match;
import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByCompetitionOrderByMatchDateDesc(String competition);
}