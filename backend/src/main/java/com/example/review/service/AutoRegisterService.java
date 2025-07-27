// backend/src/main/java/com/example/review/service/AutoRegisterService.java
package com.example.review.service;

import com.example.review.dto.FootballMatch;
import com.example.review.dto.MatchesResponse;
import com.example.review.entity.Match;
import com.example.review.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutoRegisterService {
    
    @Autowired
    private FootballApiService footballApiService;
    
    @Autowired
    private MatchRepository matchRepository;
    
    @Transactional
    public AutoRegisterResult registerChampionsLeagueMatches() {
        try {
            // チャンピオンズリーグのID: CL
            String competitionId = "CL";
            
            // 過去1年間のデータを取得
            String dateFrom = LocalDateTime.now().minusYears(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String dateTo = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            
            MatchesResponse response = footballApiService.getPastMatches(competitionId, dateFrom, dateTo);
            
            if (response == null || response.matches == null) {
                return new AutoRegisterResult(0, 0, "データが取得できませんでした");
            }
            
            List<FootballMatch> apiMatches = response.matches;
            
            // データベースに保存
            List<Match> savedMatches = apiMatches.stream()
                .map(this::convertToMatchEntity)
                .filter(match -> !matchRepository.existsById(match.getId()))
                .map(matchRepository::save)
                .collect(Collectors.toList());
            
            return new AutoRegisterResult(
                apiMatches.size(),
                savedMatches.size(),
                "チャンピオンズリーグの試合データを正常に登録しました"
            );
            
        } catch (Exception e) {
            throw new RuntimeException("自動登録に失敗しました: " + e.getMessage());
        }
    }
    
    private Match convertToMatchEntity(FootballMatch apiMatch) {
        Match match = new Match();
        match.setId(apiMatch.id);
        match.setHomeTeam(apiMatch.homeTeam.name);
        match.setAwayTeam(apiMatch.awayTeam.name);
        match.setCompetition(apiMatch.competition.name);
        match.setStatus(apiMatch.status);
        try {
            String dateString = apiMatch.utcDate;
            LocalDateTime matchDate;
            
            if (dateString.endsWith("Z")) {
                // UTC形式の場合
                matchDate = LocalDateTime.parse(
                    dateString.replace("Z", ""),
                    DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
                );
            } else {
                // その他の形式の場合
                matchDate = LocalDateTime.parse(
                    dateString,
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME
                );
            }
            
            match.setMatchDate(matchDate);
        } catch (Exception e) {
            // 日付パースに失敗した場合のフォールバック
            System.err.println("日付パースエラー: " + apiMatch.utcDate + " - " + e.getMessage());
            match.setMatchDate(LocalDateTime.now());
        }
        
        if (apiMatch.score != null && apiMatch.score.fullTime != null) {
            match.setHomeScore(apiMatch.score.fullTime.home);
            match.setAwayScore(apiMatch.score.fullTime.away);
        }
        
        match.setCreatedAt(LocalDateTime.now());
        match.setUpdatedAt(LocalDateTime.now());
        
        return match;
    }
    
    public static class AutoRegisterResult {
        public int totalMatches;
        public int registeredMatches;
        public String message;
        
        public AutoRegisterResult(int totalMatches, int registeredMatches, String message) {
            this.totalMatches = totalMatches;
            this.registeredMatches = registeredMatches;
            this.message = message;
        }
    }
}