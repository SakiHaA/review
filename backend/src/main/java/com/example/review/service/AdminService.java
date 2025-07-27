package com.example.review.service;

import com.example.review.entity.Admin;
import com.example.review.repository.AdminRepository;
// import com.example.review.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // 一時的にユーザーと同じように管理者を登録できるようにしておき、
    // 後ほどデフォルトアカウントが作成される仕組みに変更する
    public void register(String email, String password, String name) {
        if (adminRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("このメールアドレスは既に登録されています");
        }
        // ユーザーオブジェクトを作成
        Admin admin = new Admin();
        // それぞれに代入してしていく
        // controllerから受け取ったデータをsetで代入している
        admin.setEmail(email);
        // passwordEncoder.encode(password)は、
        // パスワードをハッシュ化するメソッドです。
        admin.setPassword(passwordEncoder.encode(password));
        admin.setName(name);
        // saveはJpaRepositoryから継承されているメソッド
        // (user)を保存している　更新する時などにも使用することができる
        adminRepository.save(admin);
    }




    public String authenticate(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
    //     // Optinalクラスのメソッド
    //     // あるかないかを表している　.orElseThrow
    //     // ユーザーが見つからない場合は、RuntimeExceptionを投げる
            .orElseThrow(() -> new RuntimeException("管理者が見つかりません"));
    //             // パスワード一致か照合
        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("パスワードが一致しません");
        }
    //     // jwtServiceのgenerateTokenメソッドを呼び出してreturnで戻り値になる
    //     // メソッドの中身はJwtService.javaで定義されている
        return jwtService.generateToken(email);
    }
} 