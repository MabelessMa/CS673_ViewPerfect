package org.example.repository;

import org.example.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Page<Movie> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    List<Movie> findTop5ByOrderByMovieIdDesc();
    List<Movie> findTop5ByOrderByReleaseDateDesc();
}