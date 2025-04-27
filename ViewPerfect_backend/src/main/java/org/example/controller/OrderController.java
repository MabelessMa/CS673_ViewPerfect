package org.example.controller;

import org.example.entity.Order;
import org.example.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    // 下单
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setStatus("CREATED");
        return ResponseEntity.ok(orderRepo.save(order));
    }

    // 查看用户订单列表
    @GetMapping
    public List<Order> getUserOrders(@RequestParam Long userId) {
        return orderRepo.findByUserUserId(userId);
    }

    // 取消订单
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        return orderRepo.findById(id).map(order -> {
            if (!order.getStatus().equals("CREATED")) {
                return ResponseEntity.badRequest().body("Cannot cancel this order");
            }
            order.setStatus("CANCELLED");
            return ResponseEntity.ok(orderRepo.save(order));
        }).orElse(ResponseEntity.notFound().build());
    }
}