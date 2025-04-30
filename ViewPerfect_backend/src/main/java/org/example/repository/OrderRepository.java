package org.example.repository;

import org.example.entity.Order;
import org.example.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserUserId(Integer userId);
    Optional<Order> findByOrderId(Integer orderId);
}