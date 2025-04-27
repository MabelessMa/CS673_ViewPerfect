package org.example.controller;

import org.example.entity.Cinema;
import org.example.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cinemas")
public class CinemaController {

    @Autowired
    private CinemaRepository cinemaRepo;

    // 分页 + 排序查询影院列表
    @GetMapping
    public Page<Cinema> getAllCinemas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "cinemaId,asc") String[] sort) {

        Sort sortOrder = Sort.by(Sort.Direction.fromString(sort[1]), sort[0]);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        return cinemaRepo.findAll(pageable);
    }

    // 查询单个影院
    @GetMapping("/{id}")
    public ResponseEntity<?> getCinema(@PathVariable Integer id) {
        return cinemaRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)   // 显式声明泛型
                .orElseGet(() -> ResponseEntity.status(404).body("Cinema not found"));
    }


    // 创建影院（建议限制管理员权限）
    @PostMapping
    public ResponseEntity<?> createCinema(@RequestBody Cinema cinema) {
        return ResponseEntity.ok(cinemaRepo.save(cinema));
    }

    // 更新影院信息
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCinema(@PathVariable Integer id, @RequestBody Cinema update) {
        return cinemaRepo.findById(id)
                .<ResponseEntity<?>>map(cinema -> {
                    cinema.setName(update.getName());
                    cinema.setAddress(update.getAddress());
                    cinema.setPhone(update.getPhone());
                    cinema.setHalls(update.getHalls());
                    return ResponseEntity.ok(cinemaRepo.save(cinema));
                })
                .orElseGet(() -> ResponseEntity.status(404).body("Cinema not found"));
    }


    // 删除影院
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCinema(@PathVariable Integer id) {
        if (!cinemaRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Cinema not found");
        }
        cinemaRepo.deleteById(id);
        return ResponseEntity.ok("Cinema deleted successfully");
    }
}
