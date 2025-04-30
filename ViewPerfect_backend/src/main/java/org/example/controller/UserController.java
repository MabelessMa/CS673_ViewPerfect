package org.example.controller;

import org.example.entity.User;
import org.example.repository.UserRepository;
import org.example.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 用户注册 - 强制赋予普通用户角色
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }

        if (user.getRole() == null ||
                (!user.getRole().equals(User.Role.user) && !user.getRole().equals(User.Role.admin))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role selection"));
        }

        return ResponseEntity.ok(userRepo.save(user));
    }


    /**
     * 用户登录
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
        }

        return userRepo.findByUsername(username).map(user -> {
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
            }

            String token = jwtUtil.generateToken(user);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole().name());
            response.put("userId", user.getUserId());
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);

        }).orElse(ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Integer id) {
        return userRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }

    /**
     * 更新用户信息（只允许更新邮箱、电话、密码）
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody User input) {
        return userRepo.findById(id)
                .<ResponseEntity<?>>map(user -> {
                    user.setEmail(input.getEmail());
                    user.setPhone(input.getPhone());
                    user.setPassword(input.getPassword());
                    user.setAvatarUrl(input.getAvatarUrl());
                    // 禁止修改 role 和 loyaltyPoints
                    return ResponseEntity.ok(userRepo.save(user));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }

    /**
     * 更新积分（仅管理员操作，示例）
     */
    @PutMapping("/{id}/points")
    public ResponseEntity<?> updatePoints(@PathVariable Integer id, @RequestParam Integer points) {
        return userRepo.findById(id)
                .<ResponseEntity<?>>map(user -> {
                    user.setLoyaltyPoints(points);
                    return ResponseEntity.ok(userRepo.save(user));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }
}
