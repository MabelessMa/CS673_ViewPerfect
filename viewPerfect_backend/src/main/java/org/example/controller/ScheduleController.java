package org.example.controller;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.example.dto.ScheduleDTO;
import org.example.dto.ScheduleRequestDTO;
import org.example.entity.Hall;
import org.example.entity.Movie;
import org.example.entity.Order;
import org.example.entity.Schedule;
import org.example.repository.HallRepository;
import org.example.repository.MovieRepository;
import org.example.repository.OrderRepository;
import org.example.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private MovieRepository movieRepo;

    @Autowired
    private HallRepository hallRepo;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    // 查询所有排片
    @GetMapping
    public List<ScheduleDTO> getAllSchedules() {
        List<Schedule> schedules = scheduleRepo.findAll();
        return schedules.stream()
                .map(schedule -> new ScheduleDTO(
                        schedule.getScheduleId(),
                        schedule.getMovie().getMovieId(),
                        schedule.getMovie().getTitle(),
                        schedule.getHall().getHallId(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getAvailableSeats()
                ))
                .toList();
    }


    // 根据ID查询单个排片
    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Integer id) {
        return scheduleRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Schedule not found"));
    }


    // 创建排片
    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleRequestDTO dto) {
        try {
            Movie movie = movieRepo.findById(dto.getMovieId())
                    .orElseThrow(() -> new RuntimeException("Movie not found"));
            Hall hall = hallRepo.findById(dto.getHallId())
                    .orElseThrow(() -> new RuntimeException("Hall not found"));

            LocalDateTime startTime = LocalDateTime.parse(dto.getStartTime());
            LocalDateTime endTime = LocalDateTime.parse(dto.getEndTime());

            Schedule schedule = new Schedule();
            schedule.setMovie(movie);
            schedule.setHall(hall);
            schedule.setStartTime(startTime);
            schedule.setEndTime(endTime);
            schedule.setAvailableSeats(hall.getCapacity());

            Schedule saved = scheduleRepo.save(schedule);

            ScheduleDTO responseDTO = new ScheduleDTO(
                    saved.getScheduleId(),
                    saved.getMovie().getMovieId(),
                    saved.getMovie().getTitle(),
                    saved.getHall().getHallId(),
                    saved.getStartTime(),
                    saved.getEndTime(),
                    saved.getAvailableSeats()
            );

            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create schedule: " + e.getMessage());
        }
    }


    // 更新排片
    @PatchMapping("/{id}")
    public ResponseEntity<?> patchSchedule(@PathVariable Integer id, @RequestBody Schedule updated) {
        return scheduleRepo.findById(id)
                .<ResponseEntity<?>>map(schedule -> {
                    if (updated.getMovie() != null) schedule.setMovie(updated.getMovie());
                    if (updated.getHall() != null) schedule.setHall(updated.getHall());
                    if (updated.getStartTime() != null) schedule.setStartTime(updated.getStartTime());
                    if (updated.getEndTime() != null) schedule.setEndTime(updated.getEndTime());
                    if (updated.getAvailableSeats() != null) schedule.setAvailableSeats(updated.getAvailableSeats());
                    scheduleRepo.save(schedule);
                    return ResponseEntity.ok("Schedule patched successfully");
                })
                .orElseGet(() -> ResponseEntity.status(404).body("Schedule not found"));
    }


    // 删除排片
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer id) {
        if (!scheduleRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Schedule not found");
        }
        scheduleRepo.deleteById(id);
        return ResponseEntity.ok("Schedule deleted successfully");
    }



}