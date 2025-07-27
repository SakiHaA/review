package com.example.review.controller;

// import com.example.review.entity.User;
import com.example.review.service.UserService;
// import com.example.review.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    // private JwtService jwtService;

    @PostMapping("/register")
    // @@RequestBody Map<String, String
    // HTTPリクエストのボディから送られてきたJSONデータを
    // JavaのMapオブジェクトに変換している
    // こんな感じ
    // const formData = {
    //     email: "user@example.com",
    //     password: "password123",
    //     name: "山田太郎"
    // };
    
    // // JSONに変換して送信して
    // fetch('http://localhost:8080/api/user/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
        // body: JSON.stringify(formData)
    // });
// userDataという名前で受け取っている
    // {
    //     "email": "user@example.com",
    //     "password": "password123",
    //     "name": "山田太郎"
    // }

    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        // userServiceのregisterメソッドを使用している

        try {
            System.out.println("Received user data: " + userData);
            userService.register(
                // それぞれをgetで渡して、Serviceに渡している
                userData.get("email"),
                userData.get("password"),
                userData.get("name")
            );
            // ResponseEntity.ok(
            // HTTPステータスコード200（OK）のレスポンスを作成
            // リクエストが成功したことを示す
            // .contentType(MediaType.APPLICATION_JSON)
            // レスポンスのContent-Typeをapplication/jsonに設定
           // Map.of()はjava.utl.mapインターフェース内に入っているメソッド
           // キーと値のペアを保持するデータ構造を作成することができる
           // この場合、Map.of("message", "ユーザー登録が完了しました")
           
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "ユーザー登録が完了しました"));
        
        } catch (RuntimeException e) {
            // エラー時もJSONレスポンスを返す
            return ResponseEntity.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    // @RequestBodyの役割
    // HTTPリクエストのボディを自動的にJavaオブジェクトに変換
    // この場合、JSONをMap<String, String>に変換
    // キーがString、値もStringのマップとして受け取る
    // ResponseEntityとは:
    // HTTPレスポンスを表現するクラスです
    // ステータスコード、ヘッダー、ボディなどのHTTPレスポンスの全要素を制御できます
    // ? (ワイルドカード)について:
    // Javaのジェネリクス記法の一部です
    // ?は「任意の型」を表します
    // この場合、レスポンスボディの型が動的に変わる可能性があることを示しています
    // なぜ?を使うのか:
    // この例では、Map.of("token", token)を返していますが
    // 場合によっては異なる型のレスポンスを返す可能性があることを示唆しています
    // 例えばエラー時に異なる形式のレスポンスを返すかもしれません
    // public の戻り値はResponseEntity<?>型
    // loginは自作で定義したもの, (A, B)のものは左が外部から持ってくるデータの型,　パラメータ名
    // Javaのコレクションフレームワークの一つで、キーと値のペアを保持するデータ構造です。
    // <キーの型, 値の型>
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        // authoentificateはユーザーのメールアドレスを取ってくるメソッド
        try {
            String token = userService.authenticate(
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

    // ホーム画面のコントローラー
    // @GetMapping("/home")
    // @RequestHeader: HTTPリクエストのヘッダーから値を取得するアノテーション
    // "Authorization": 取得したいヘッダーの名前
    // String authHeader: 取得した値を格納する変数
    // public ResponseEntity<?> getHome(@RequestHeader("Authorization") String authHeader) { 
        
    //     try {
    //         // Authorizationからbearerを取り除いてトークンを抽出
    //         String token = authHeader.substring(7);

    //         String email = jwtService.extractEmail(token);
    //         // Userはテーブル型
    //         User user = userService.findByEmail(email);
    //         // ユーザーが見つからない場合は、RuntimeExceptionを投げる
    //         if (user == null) {
    //             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    //                 .body(Map.of("message", "ログインしていません"));
    //         }
    // 
    //     return ResponseEntity.ok()
    //         .contentType(MediaType.APPLICATION_JSON)
    //         .body(Map.of("name", user.getName()));
        
        // } catch (Exception e) { 
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        //         .body(Map.of("message", "認証に失敗しました"));   
        // }
    // }

} 