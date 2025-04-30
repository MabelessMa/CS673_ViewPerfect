package org.example.entity;

import jakarta.persistence.*;
import org.example.entity.Coupon;
import org.example.entity.Schedule;
import org.example.entity.Seat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "`order`")  // 将表名改为 'order'，与数据库一致
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;


    // 用户关联
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 排期关联（需要定义 Schedule 实体类）
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    // 优惠券关联（可为空）
    @ManyToOne
    @JoinColumn(name = "coupon_id", nullable = true)
    private Coupon coupon;

    @ManyToMany
    @JoinTable(
            name = "order_seat",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "seat_id")
    )
    private List<Seat> seats = new ArrayList<>();



    // 订单时间，默认设置为当前时间
    private LocalDateTime orderTime = LocalDateTime.now();

    // 订单状态（使用枚举类型）
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.UNPAID; // 默认状态为 'unpaid'

    // 订单状态的枚举
    public enum OrderStatus {
        UNPAID, PAID, CANCELED, COMPLETED
    }

    public Order() {}

    // Getters 和 Setters

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}