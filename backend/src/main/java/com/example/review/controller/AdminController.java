package com.example.review.controller;

import com.example.review.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") 
public class AdminController {

    @Autowired
    private AdminService adminService;

    // 一時的にユーザーと同じように管理者を登録できるようにしておき、
    // 後ほどデフォルトアカウントが作成される仕組みに変更する
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> adminData) {
        try {
            adminService.register(
                adminData.get("email"),
                adminData.get("password"),
                adminData.get("name")
            );
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "管理者登録が完了しました"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage()));
        }
    }




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        // authoentificateはユーザーのメールアドレスを取ってくるメソッド
        try {
            String token = adminService.authenticate(
                credentials.get("email"),
                credentials.get("password")
            );
            // ResponseEntity.ok()
            // HTTPステータスコード200（OK）のレスポンスを作成
            // リクエストが成功したことを示す
            // .contentType(MediaType.APPLICATION_JSON)
            // レスポンスのContent-Typeをapplication/jsonに設定
            // クライアントにJSONデータを返すことを示す
            // .body(Map.of("token", token))
            // レスポンスボディを設定
            // Map.of("token", token)でJSONオブジェクトを作成
            // 例：{"token": "eyJhbGciOiJIUzI1NiIs..."}
            return ResponseEntity.ok()
            // Content-Type: application/json
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("token", token));
        } catch (RuntimeException e) { 
            return ResponseEntity.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage()));
        }
    }

    
    // ログアウトの簡易版
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {  // ヘッダーを受け取る
    try {
        // トークンの処理（必要に応じて）
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "ログアウトしました"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "ログアウトに失敗しました"));
    }
}

    // ログアウトのセキュリティ面の強化版
    // @PostMapping("/logout")
    // @RequestHeader: HTTPリクエストのヘッダーから値を取得するアノテーション
    // "Authorization": 取得したいヘッダーの名前
    // String authHeader: 取得した値を格納する変数
    // public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) { 
        
    //     try {
    //         String token = authHeader.substring(7);
    //     tokenBlacklist.addToken(token);
    //     return ResponseEntity.ok()
    //             .body(Map.of("message", "ログアウトしました"));
    //     } catch (Exception e) {
    //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    //         .body(Map.of("message", "ログアウトに失敗しました"));   
    //     }
    // }

} 