package org.example.security;

import org.example.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "viewperfect123456789012345678901234";  // 最好放配置文件
    private final Key SIGNING_KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // 生成 Token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userId", user.getUserId())     // 修正 getUserId
                .claim("role", user.getRole().name())  // 枚举转字符串
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(SIGNING_KEY)
                .compact();
    }

    // 解析 Token，提取 Claims
    public Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SIGNING_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expired");
        } catch (JwtException e) {
            throw new RuntimeException("Invalid token");
        }
    }

    // 提供提取用户名的方法
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // 提供提取角色的方法
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }
}


