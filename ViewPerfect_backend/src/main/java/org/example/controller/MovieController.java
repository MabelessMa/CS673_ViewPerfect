package org.example.controller;

import org.example.entity.Movie;
import org.example.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;



import java.util.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepo;

    // 分页 + 搜索 + 排序 查询电影
    @GetMapping
    public Page<Movie> getAllMovies(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "movieId,asc") String[] sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort[1]), sort[0]));
        if (search == null || search.isEmpty()) {
            return movieRepo.findAll(pageable);
        } else {
            return movieRepo.findByTitleContainingIgnoreCase(search, pageable);
        }
    }

    // 查询单部电影
    @GetMapping("/{id}")
    public ResponseEntity<?> getMovie(@PathVariable Integer id) {
        return movieRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of(
                        "error", "Movie not found",
                        "code", 404
                )));
    }



    // 创建电影（建议加管理员权限校验）
    @PostMapping
    public ResponseEntity<?> createMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieRepo.save(movie));
    }

    // 更新电影信息
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovie(@PathVariable Integer id, @Valid @RequestBody Movie updated) {
        return movieRepo.findById(id).map(movie -> {
            movie.setTitle(updated.getTitle());
            //movie.setDirector(updated.getDirector());
            movie.setReleaseDate(updated.getReleaseDate());
            movie.setDuration(updated.getDuration());
            movie.setPrice(updated.getPrice());
            //movie.setImage(updated.getImage());
            movie.setDescription(updated.getDescription());
            movie.setGenre(updated.getGenre());
            movie.setLanguage(updated.getLanguage());

            Movie savedMovie = movieRepo.save(movie);

            return ResponseEntity.ok(Map.of(
                    "message", "Movie updated successfully",
                    "data", savedMovie
            ));
        }).orElse(ResponseEntity.status(404).body(Map.of(
                "error", "Movie not found"
        )));
    }


    // 删除电影
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id) {
        if (!movieRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Movie not found");
        }
        movieRepo.deleteById(id);
        return ResponseEntity.ok("Movie deleted successfully");
    }

    // 电影评分
    @PostMapping("/{id}/rate")
    public ResponseEntity<?> rateMovie(@PathVariable Integer id, @RequestBody Map<String, Integer> payload) {
        Optional<Movie> optional = movieRepo.findById(id);
        if (optional.isPresent()) {
            int rating = payload.getOrDefault("rating", 0);
            if (rating < 1 || rating > 5) {
                return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
            }
            Movie movie = optional.get();
            //movie.addRating(rating);
            return ResponseEntity.ok(movieRepo.save(movie));
        }
        return ResponseEntity.status(404).body("Movie not found");
    }

    // 推荐电影（按评分或最新）
    @GetMapping("/recommended")
    public List<Movie> recommended() {
        return movieRepo.findTop5ByOrderByReleaseDateDesc();
    }
}
