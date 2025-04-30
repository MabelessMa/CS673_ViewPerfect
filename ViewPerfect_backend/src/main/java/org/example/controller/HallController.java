package org.example.controller;

import org.example.dto.HallDTO;
import org.example.dto.SeatBookingRequest;
import org.example.dto.SeatDTO;
import org.example.entity.Hall;
import org.example.entity.Seat;
import org.example.entity.Seat.SeatStatus;
import org.example.entity.Order;
import org.example.repository.HallRepository;
import org.example.repository.OrderRepository;
import org.example.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallRepository hallRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private SeatRepository seatRepo;

    /**
     * 获取某个影厅的所有座位信息
     */
    @GetMapping("/{id}/seats")
    public ResponseEntity<?> getSeats(@PathVariable Integer id) {
        return hallRepo.findById(id)
                .<ResponseEntity<?>>map(hall -> {
                    List<SeatDTO> seatDtos = hall.getSeats().stream()
                            .map(seat -> new SeatDTO(
                                    seat.getRowNumber(),
                                    seat.getSeatNumber(),
                                    seat.getStatus().name(),
                                    seat.getOverallScore(),
                                    seat.getSeatId()
                            ))
                            .toList();
                    return ResponseEntity.ok(seatDtos);
                })
                .orElseGet(() -> ResponseEntity.status(404).body("Hall not found"));
    }

    @GetMapping
    public List<HallDTO> getAllHalls() {
        return hallRepo.findAll().stream()
                .map(hall -> new HallDTO(hall.getHallId(), hall.getName(), hall.getCapacity()))
                .toList();
    }


    /**
     * 更新座位状态为 BOOKED，并关联订单
     */
    @PutMapping("/{hallId}/seats")
    public ResponseEntity<?> updateSeatStatus(@PathVariable Integer hallId, @RequestBody SeatBookingRequest request) {
        return hallRepo.findById(hallId).map(hall -> {
            List<Seat> seats = hall.getSeats();
            boolean updated = false;

            for (Seat s : seats) {
                if (s.getRowNumber().equals(request.getRowNumber()) &&
                        s.getSeatNumber().equals(request.getSeatNumber())) {

                    if (s.getStatus() != SeatStatus.BOOKED) {
                        s.setStatus(SeatStatus.BOOKED);
                        updated = true;

                        Integer orderId = request.getOrderId();
                        Order order = orderRepo.findById(orderId).orElse(null);

                        if (order != null) {
                            s.getOrders().add(order);
                            seatRepo.save(s);  // 保存 Seat
                        } else {
                            return ResponseEntity.status(404).body("Order not found");
                        }
                    } else {
                        return ResponseEntity.badRequest().body("Seat already booked");
                    }
                    break;
                }
            }

            if (!updated) {
                return ResponseEntity.status(404).body("Seat not found");
            }

            return ResponseEntity.ok("Seat booked successfully");

        }).orElse(ResponseEntity.status(404).body("Hall not found"));
    }
}