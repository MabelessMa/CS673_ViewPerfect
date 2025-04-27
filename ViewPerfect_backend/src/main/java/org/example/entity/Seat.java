package org.example.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seatId;

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    private String rowNumber;
    private Integer seatNumber;

    private String status = "AVAILABLE";  // AVAILABLE, BOOKED

    @ElementCollection
    private List<Integer> experienceRatings = new ArrayList<>();

    public double getAverageExperienceRating() {
        return experienceRatings.isEmpty() ? 0 : experienceRatings.stream().mapToInt(Integer::intValue).average().orElse(0);
    }

    // Getters & Setters

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Integer> getExperienceRatings() {
        return experienceRatings;
    }

    public void setExperienceRatings(List<Integer> experienceRatings) {
        this.experienceRatings = experienceRatings;
    }
}

