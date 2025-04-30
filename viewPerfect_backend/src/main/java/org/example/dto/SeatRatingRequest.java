package org.example.dto;

import java.util.List;

public class SeatRatingRequest {
    private List<String> seatIds;
    private Integer rating;

    public List<String> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<String> seatIds) {
        this.seatIds = seatIds;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}

