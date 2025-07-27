// backend/src/main/java/com/example/review/service/FootballApiService.java
package com.example.review.service;

import com.example.review.dto.MatchesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FootballApiService {
    
    @Value("${football.api.key}")
    private String apiKey;
    
    @Value("${football.api.base-url}")
    private String baseUrl;
    
    @Autowired
    private RestTemplate restTemplate;
    // 外部APIから過去の試合データをとってくるとこ
    public MatchesResponse getPastMatches(String competitionId, String dateFrom, String dateTo) {
        String url = baseUrl + "/competitions/" + competitionId + "/matches" +
                    "?dateFrom=" + dateFrom + "&dateTo=" + dateTo;
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiKey);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        try {
            ResponseEntity<MatchesResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                MatchesResponse.class
            );
            
            return response.getBody();
            
        } catch (Exception e) {
            throw new RuntimeException("過去の試合データの取得に失敗しました", e);
        }
    }
}