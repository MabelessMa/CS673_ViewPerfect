package org.example.repository;

import org.example.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {

    // 根据 seatId 查找座位
    Seat findBySeatId(String seatId);

    // 正确写法：通过 hall.hallId 查找
    List<Seat> findByHall_HallId(Integer hallId);

    // 根据座位状态查找所有座位
    List<Seat> findByStatus(Seat.SeatStatus status);
}