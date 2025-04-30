package org.example.repository;

import org.example.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    // 根据用户ID查找优惠券
    List<Coupon> findByUser_UserId(Long userId);


    // 根据优惠券状态查找优惠券
    List<Coupon> findByStatus(Coupon.CouponStatus status);

    // 根据优惠券代码查找优惠券
    Coupon findByCode(String code);
}