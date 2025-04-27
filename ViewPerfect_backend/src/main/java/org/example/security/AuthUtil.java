package org.example.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.example.entity.User;

public class AuthUtil {

    public static boolean isAdmin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return user.getRole() == User.Role.admin;
        }
        return false;
    }
}
