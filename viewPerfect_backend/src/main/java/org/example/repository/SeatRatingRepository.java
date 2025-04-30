package org.example.repository;

import org.example.entity.SeatRating;
import org.example.entity.SeatRatingId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRatingRepository extends JpaRepository<SeatRating, SeatRatingId> {
}

