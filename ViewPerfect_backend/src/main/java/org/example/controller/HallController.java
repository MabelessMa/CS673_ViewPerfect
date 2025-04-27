package org.example.controller;

import org.example.entity.Seat;
import org.example.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallRepository hallRepo;

    /**
     * 获取某个影厅的所有座位信息
     */
    @GetMapping("/{id}/seats")
    public ResponseEntity<?> getSeats(@PathVariable Integer id) {
        return hallRepo.findById(id)
                .<ResponseEntity<?>>map(hall -> ResponseEntity.ok(hall.getSeats()))
                .orElseGet(() -> ResponseEntity.status(404).body("Hall not found"));
    }


    /**
     * 更新座位状态为 BOOKED
     */
    @PutMapping("/{hallId}/seats")
    public ResponseEntity<?> updateSeatStatus(@PathVariable Integer hallId, @RequestBody Seat requestSeat) {
        return hallRepo.findById(hallId).map(hall -> {
            List<Seat> seats = hall.getSeats();
            boolean updated = false;

            for (Seat s : seats) {
                if (s.getRowNumber().equals(requestSeat.getRowNumber()) &&
                        s.getSeatNumber().equals(requestSeat.getSeatNumber())) {
                    if (!"BOOKED".equals(s.getStatus())) {
                        s.setStatus("BOOKED");
                        updated = true;
                    } else {
                        return ResponseEntity.badRequest().body("Seat already booked");
                    }
                    break;
                }
            }

            if (!updated) {
                return ResponseEntity.status(404).body("Seat not found");
            }

            hall.setSeats(seats);
            hallRepo.save(hall);
            return ResponseEntity.ok("Seat booked successfully");

        }).orElse(ResponseEntity.status(404).body("Hall not found"));
    }
}
