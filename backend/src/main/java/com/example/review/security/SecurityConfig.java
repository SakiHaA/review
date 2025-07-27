package com.example.review.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import jakarta.annotation.PostConstruct;

// import jakarta.annotation.PostConstruct;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
// public class SecurityConfig<JwtAuthenticationFilter> {
public class SecurityConfig{

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    // @PostConstruct
    // public void init() {
    //     System.out.println("SecurityConfig initialized");  // 設定初期化確認
    //     System.out.println("JwtAuthenticationFilter: " + (jwtAuthenticationFilter != null));  // フィルター存在確認
    // }
    // メソッドの戻り値をSpringのBeanとして登録
    // アプリケーション内で依存性注入（DI）が可能になる
    @Bean
    // 異なるオリジン(ドメイン)からのリクエストを許可するための設定
    // こんな感じで異なるオリジン(異なるポート番号)だったりする時に書く必要がある
    // フロントエンド: http://localhost:3000
    // バックエンド:   http://localhost:8080
    // このような場合にCORSの設定が必要になってくる
    // 本番環境だと
    // フロントエンド: https://example.com
    // バックエンド:   https://api.example.com
    // こんな感じになるらしい
    // 同じオリジンの場合はCORSの設定は不要
    // フロントエンド: http://localhost:8080
    // バックエンド:   http://localhost:8080
    // この場合はCORSの設定は不要


    // 上ではセキュリティをどこで適用するか記載する
    // throws Exceptionで例外が発生した時、例外が出たことを呼び出し元に伝える
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORSの設定を適用(有効化)したい時に記載する
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // CSRF（Cross-Site Request Forgery）保護を無効にする設定
            // セッション使用時には使用するが、Jwt認証を使用する場合は使用しないらしい
            .csrf(csrf -> csrf.disable())

             // フォームログインを無効化（今回はJwt認証を使用するので不要）
             .formLogin(form -> form.disable())
             
             // HTTP Basic認証を無効化（今回はJwt認証を使用するので不要）
             .httpBasic(basic -> basic.disable())


            .authorizeHttpRequests(auth -> auth
            // 認証が不要となるエンドポイント
            .requestMatchers("/api/user/register", "/api/user/login").permitAll()
            // .requestMatchers("/api/user/logout").authenticated()
            // .requestMatchersは複数行に分けてOK
                // .requestMatchers("/api/admin/login").permitAll()
            // それ以外は全て認証が必要
            // .anyRequest().authenticated()
            .anyRequest().permitAll()
            )

            // セッション管理を無効化（今回はJwt認証を使用するので不要）
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // セッションではなくJwt認証を使用する意思を示すもの
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // spring-security-webにあるUsernamePasswordAuthenticationFilterを使用
            // jwtAuthenticationFilterをUsernamePasswordAuthenticationFilterの前に配置する
            // つまり、JWT認証をフォームログイン認証より先に実行する(今回はUsernamePasswordAuthenticationFilter.classの実装不要　なぜなら主にセッション使用時に採用されるから)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // CORSの設定を保持するオブジェクトを作成する
        CorsConfiguration configuration = new CorsConfiguration();
        // フロントエンド側からのリクエストに対してどのオリジンなら許可されるかを設定する
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        // フロントエンド側からのリクエストに対してどのメソッドなら許可されるかを設定する
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // フロントエンド側からのリクエストに対してどのヘッダーなら許可されるかを設定する
        // Authorization - JWTトークンを含む認証情報を送信するために使用されます。フロントエンドでユーザーがログインした後、APIリクエスト時にこのヘッダーにBearer <token>の形式でトークンを設定します。
        // Content-Type - リクエストのボディの形式を指定します（例：application/json）
        // Accept - クライアントが受け入れ可能なレスポンスの形式を指定します
        // Origin - リクエストの送信元のオリジンを指定します
        // X-Requested-With - リクエストがAjaxリクエストであることを示すために使用される
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));
        // フロントエンド側からのリクエストに対してどのヘッダーなら許可されるかを設定する
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        // CORS（Cross-Origin Resource Sharing）の重要な部分で、
        // クロスオリジンリクエストでクレデンシャル（認証情報）の送信を許可するかどうかを指定する
        // ここはセッションやクッキーに関するものなので、Jwt認証使用時には不要らしい
        // configuration.setAllowCredentials(true);
        // UrlBasedCorsConfigurationSourceでCORS設定をどこに適応するか記す
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // registerCorsConfigurationでpassを指定する
        // /**は全てのパスに対して行われることを指す
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
} 