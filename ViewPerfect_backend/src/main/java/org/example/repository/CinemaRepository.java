package org.example.repository;

import org.example.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
}
