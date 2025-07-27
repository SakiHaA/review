package com.example.review.security;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// import com.example.review.service.TokenBlacklistService;

import java.security.Key;
import java.util.Date;
// import java.util.HashMap;
import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {
    // pulivate 同じクラス内でのみアクセス可能
    // final一度値が入ると変更不可
    // keysはio.jsonwebtoken.security.Keysパッケージのクラス
    // Jwtの署名に必要な鍵を生成管理するユーティリティクラス
    // secretKeyForメソッドは、秘密鍵を作成するメソッド
    // SignatureAlgorithm.HS256はHMAC-SHA256アルゴリズムを指していて
    // 同じ鍵で署名と検証まで行うメソッド
    // キーを生成するメソッド
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // long型のvalidityInMillisecondsを定義　これはJwtService.javaで定義されている
    // @Value("${jwt.secret}")
    // private String secret;

    // @Value("${jwt.expiration}")
    // private Long expiration;
    // private long validityInMilliseconds;
    // このように書いて、application.propertiesで設定した値を取得する方法が望ましいらしい
    private final long validityInMilliseconds = 3600000; // 1時間(3600000ミリ秒)

    // public String generateToken(String username) {
    //     Map<String, Object> claims = new HashMap<>();
    //     return createToken(claims, username);
    // }

    public String createToken(Map<String, Object> claims, String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        // Jwts.builder()
        // JWTトークンを構築するためのビルダーを開始
        // メソッドチェーンで設定を追加していく
        // setClaims(claims)
        // トークンに含める追加情報を設定
        // Map<String, Object>形式で情報を渡す
        // 例：{"role": "USER", "userId": 123}
        // .setSubject(email)
        // トークンの主体（ユーザー）を設定
        // 通常はユーザーのメールアドレス
        // トークンのsubクレームとして保存
        // .setExpiration(validity)
        // トークンの有効期限を設定
        // 現在時刻 + 有効期間
        // トークンのexpクレームとして保存
        // .signWith(key)
        // トークンに署名を設定
        // 改ざんを防止
        // 暗号化された署名を追加
        // .compact()
        // 設定した情報からJWTトークンを生成
        // Base64URLエンコードされた文字列を返す
        // String型で返す
        // こんな感じのトークンがString型で返ってくる
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(key)
            .compact();
    }
    
    // validateTokenメソッドを追加
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
} 