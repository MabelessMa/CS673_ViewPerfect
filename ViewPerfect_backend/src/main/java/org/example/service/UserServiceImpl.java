package org.example.service;

import org.example.entity.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User register(User user) {
        return userRepo.save(user);
    }

    @Override
    public Optional<User> login(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));  // 简单明文比较
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepo.findById(id);
    }

    @Override
    public User updateUser(Integer id, User updatedUser) {
        return userRepo.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public boolean updatePassword(Integer id, String newPassword) {
        return userRepo.findById(id).map(user -> {
            user.setPassword(newPassword);
            userRepo.save(user);
            return true;
        }).orElse(false);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepo.deleteById(id);
    }
}
