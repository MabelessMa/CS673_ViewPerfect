package org.example.controller;

import org.example.entity.Coupon;
import org.example.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponRepository couponRepo;

    // 创建新优惠券
    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody Coupon coupon) {
        return ResponseEntity.ok(couponRepo.save(coupon));
    }

    // 获取用户的所有优惠券
    @GetMapping("/user/{userId}")
    public List<Coupon> getCouponsByUser(@PathVariable Long userId) {
        return couponRepo.findByUser_UserId(userId);
    }

    // 根据状态获取优惠券
    @GetMapping("/status/{status}")
    public List<Coupon> getCouponsByStatus(@PathVariable Coupon.CouponStatus status) {
        return couponRepo.findByStatus(status);
    }

    // 使用优惠券
    @PutMapping("/{couponId}/use")
    public ResponseEntity<?> useCoupon(@PathVariable Long couponId) {
        return couponRepo.findById(couponId).map(coupon -> {
            if (coupon.getStatus() == Coupon.CouponStatus.UNUSED) {
                coupon.setStatus(Coupon.CouponStatus.USED);
                return ResponseEntity.ok(couponRepo.save(coupon));
            }
            return ResponseEntity.badRequest().body("Coupon has already been used or expired.");
        }).orElse(ResponseEntity.notFound().build());
    }

    // 过期优惠券
    @PutMapping("/{couponId}/expire")
    public ResponseEntity<?> expireCoupon(@PathVariable Long couponId) {
        return couponRepo.findById(couponId).map(coupon -> {
            if (coupon.getStatus() == Coupon.CouponStatus.UNUSED) {
                coupon.setStatus(Coupon.CouponStatus.EXPIRED);
                return ResponseEntity.ok(couponRepo.save(coupon));
            }
            return ResponseEntity.badRequest().body("Coupon cannot be expired.");
        }).orElse(ResponseEntity.notFound().build());
    }
}