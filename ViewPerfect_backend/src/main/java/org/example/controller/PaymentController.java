package org.example.controller;
import org.example.entity.Booking;
import org.example.entity.Cinema;
import org.example.entity.Payment;
import org.example.repository.BookingRepository;
import org.example.repository.CinemaRepository;
import org.example.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private BookingRepository bookingRepo;

    // 支付接口
    @PostMapping
    public ResponseEntity<?> makePayment(@RequestBody Payment payment) {
        Booking booking = bookingRepo.findById(payment.getBooking().getBookingId())
                .orElse(null);
        if (booking == null) {
            return ResponseEntity.badRequest().body("Invalid booking ID.");
        }

        // 模拟支付成功
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(new Date());
        paymentRepo.save(payment);

        // 更新订单状态
        booking.setStatus("PAID");
        bookingRepo.save(booking);

        return ResponseEntity.ok("Payment successful and booking confirmed.");
    }

    // 查询支付记录
    @GetMapping("/booking/{bookingId}")
    public List<Payment> getPaymentsByBooking(@PathVariable Long bookingId) {
        return paymentRepo.findByBookingBookingId(bookingId);
    }
}

