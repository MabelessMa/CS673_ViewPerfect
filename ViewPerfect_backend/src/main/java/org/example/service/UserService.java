package org.example.service;

import org.example.entity.User;

import java.util.Optional;

public interface UserService {
    User register(User user);
    Optional<User> login(String username, String password);
    Optional<User> getUserById(Integer id);
    User updateUser(Integer id, User updatedUser);
    boolean updatePassword(Integer id, String newPassword);
    void deleteUser(Integer id);
}
