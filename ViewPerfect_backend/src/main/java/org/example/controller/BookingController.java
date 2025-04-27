package org.example.controller;

import org.example.entity.Booking;
import org.example.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    // 创建订单（下单）
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        booking.setStatus("CREATED");
        booking.setBookingDate(new Date());
        return ResponseEntity.ok(bookingRepo.save(booking));
    }

    // 查询当前用户的订单列表
    @GetMapping
    public List<Booking> getUserBookings(@RequestParam Long userId) {
        return bookingRepo.findByUserUserId(userId);
    }

    // 取消订单
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        return bookingRepo.findById(id).map(booking -> {
            if ("PAID".equals(booking.getStatus())) {
                return ResponseEntity.badRequest().body("Paid bookings cannot be cancelled.");
            }
            booking.setStatus("CANCELLED");
            return ResponseEntity.ok(bookingRepo.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }
}
