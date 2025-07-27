package com.example.review.service;

import com.example.review.entity.User;
import com.example.review.repository.UserRepository;
// import com.example.review.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // @Autowired
    // private JwtUtil jwtUtil;

    public void register(String email, String password, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("このメールアドレスは既に登録されています");
        }
        // ユーザーオブジェクトを作成
        User user = new User();
        // それぞれに代入してしていく
        // controllerから受け取ったデータをsetで代入している
        user.setEmail(email);
        // passwordEncoder.encode(password)は、
        // パスワードをハッシュ化するメソッドです。
        user.setPassword(passwordEncoder.encode(password));
        user.setName(name);
        // saveはJpaRepositoryから継承されているメソッド
        // (user)を保存している　更新する時などにも使用することができる
        userRepository.save(user);
    }
    
    public String authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
    //     // Optinalクラスのメソッド
    //     // あるかないかを表している　.orElseThrow
    //     // ユーザーが見つからない場合は、RuntimeExceptionを投げる
            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
    //             // パスワード一致か照合
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("パスワードが一致しません");
        }
    //     // jwtServiceのgenerateTokenメソッドを呼び出してreturnで戻り値になる
    //     // メソッドの中身はJwtService.javaで定義されている
        return jwtService.generateToken(email);
    }

    // ログイン後のトップページ
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
    }
} 