package com.example.review.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.review.service.TokenBlacklist;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
// // org.springframework.web.filterパッケージにOncePerRequestFilterクラスが含まれている
// // OncePerRequestFilterは、HTTPリクエストごとに1回だけフィルターが実行される
// // このクラスを継承することで、doFilterInternalメソッドをオーバーライドすることができる
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenBlacklist tokenBlacklist;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        // 認証が不要なエンドポイントはスキップ
        if (request.getRequestURI().equals("/api/user/login") || 
            request.getRequestURI().equals("/api/user/register")|| 
            request.getRequestURI().equals("/api/admin/register")|| 
            request.getRequestURI().equals("/api/admin/login") ||
            // request.getRequestURI().equals("/api/admin/logout") ||
            request.getRequestURI().equals("/api/matches/champions-league") ||
            request.getRequestURI().equals("/api/admin/autoregister")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) { 
            String token = authHeader.substring(7);  // "Bearer "
            try { 
                if (!tokenBlacklist.isBlacklisted(token) && jwtUtil.validateToken(token)) {
                    filterChain.doFilter(request, response);
                    return;
                }
            } catch (Exception e) {
                logger.error("トークンの検証中にエラーが発生しました", e);
            }
        }
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }
}
