package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showtimeId;

    @ManyToOne
    private Movie movie;

    @ManyToOne
    private Hall hall;

    private Date showDateTime;

    public Integer getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Integer showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Hall getHall() {
        return hall;
    }

    public void setHall(Hall hall) {
        this.hall = hall;
    }

    public Date getShowDateTime() {
        return showDateTime;
    }

    public void setShowDateTime(Date showDateTime) {
        this.showDateTime = showDateTime;
    }
}
