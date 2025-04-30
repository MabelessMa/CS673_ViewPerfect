package org.example.controller;

import org.example.dto.SeatRatingRequest;
import org.example.entity.Order;
import org.example.entity.Seat;
import org.example.repository.OrderRepository;
import org.example.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
    @RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatRepository seatRepo;

    @Autowired
    private OrderRepository orderRepo;

    /**
     * 获取单个座位的详细信息
     */
    @GetMapping("/{seatId}")
    public ResponseEntity<?> getSeat(@PathVariable String seatId) {
        return seatRepo.findById(seatId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)   // ✅ 显式声明泛型
                .orElseGet(() -> ResponseEntity.status(404).body("Seat not found"));
    }


    /**
     * 更新座位评分
     */
    @PutMapping("/rate")
    public ResponseEntity<?> rateMultipleSeats(
            @RequestParam Integer orderId,
            @RequestBody SeatRatingRequest request) {

        Order order = orderRepo.findById(orderId).orElse(null);
        if (order == null) {
            return ResponseEntity.status(404).body("Order not found");
        }

        List<String> seatIds = request.getSeatIds();
        Integer rating = request.getRating();

        if (seatIds == null || seatIds.isEmpty()) {
            return ResponseEntity.badRequest().body("Seat ID list is empty");
        }

        for (String seatId : seatIds) {
            Seat seat = seatRepo.findById(seatId).orElse(null);
            if (seat == null) {
                continue; // 或直接 return ResponseEntity.status(404)...
            }

            seat.addRating(order, rating);
            seatRepo.save(seat);
        }

        order.setStatus(Order.OrderStatus.COMPLETED);
        orderRepo.save(order);

        return ResponseEntity.ok("Ratings submitted for multiple seats");
    }



}