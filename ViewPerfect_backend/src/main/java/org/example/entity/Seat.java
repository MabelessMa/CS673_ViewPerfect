package org.example.entity;

import jakarta.persistence.*;
import org.example.entity.Hall;
import org.example.entity.Schedule;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Seat {

    @Id
    @Column(name = "seat_id", length = 50)
    private String seatId;  // 座位ID（VARCHAR(50)）

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    @Column(name = "row_num", length = 10)
    private String rowNumber;    // 对应 SQL 的 row_num

    @Column(name = "column_num")
    private Integer seatNumber;  // 对应 SQL 的 column_num

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SeatStatus status = SeatStatus.AVAILABLE;  // 初始状态为 AVAILABLE

    @Column(name = "overall_score")
    private Double overallScore;  // 综合评分，存储该座位的平均评分

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeatRating> seatRatings = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "order_seat",  // 关联表
            joinColumns = @JoinColumn(name = "seat_id"),
            inverseJoinColumns = @JoinColumn(name = "order_id")
    )
    private List<Order> orders = new ArrayList<>();  // 与多个订单关联

    @ManyToMany
    @JoinTable(
            name = "schedule_seat",  // 关联表
            joinColumns = @JoinColumn(name = "seat_id"),
            inverseJoinColumns = @JoinColumn(name = "schedule_id")
    )
    private List<Schedule> schedules = new ArrayList<>();  // 与多个排期关联

    // 枚举类型，表示座位状态
    public enum SeatStatus {
        AVAILABLE, BOOKED, BROKEN
    }

    // 计算平均评分
    public double getAverageExperienceRating() {
        return seatRatings.isEmpty() ? 0.0 :
                seatRatings.stream()
                        .mapToInt(SeatRating::getRating)
                        .average()
                        .orElse(0.0);
    }

    // ✅ 添加评分记录（和关联 Order）
    public void addRating(Order order, int rating) {
        SeatRating seatRating = new SeatRating(this, order, rating);
        this.seatRatings.add(seatRating);
        this.overallScore = getAverageExperienceRating();  // 实时更新平均评分
    }


    // Getters and Setters
    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public Hall getHall() {
        return hall;
    }

    public void setHall(Hall hall) {
        this.hall = hall;
    }

    public String getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(String rowNumber) {
        this.rowNumber = rowNumber;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public SeatStatus getStatus() {
        return status;
    }

    public void setStatus(SeatStatus status) {
        this.status = status;
    }

    public List<SeatRating> getSeatRatings() {
        return seatRatings;
    }

    public void setSeatRatings(List<SeatRating> seatRatings) {
        this.seatRatings = seatRatings;
    }

    public Double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(Double overallScore) {
        this.overallScore = overallScore;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }
}