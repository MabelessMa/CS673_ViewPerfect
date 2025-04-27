package org.example.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Showtime showtime;

    private String seatInfo;
    private Date bookingDate;
    private String status;  // CREATED, PAID, CANCELLED


    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public String getSeatInfo() {
        return seatInfo;
    }

    public void setSeatInfo(String seatInfo) {
        this.seatInfo = seatInfo;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
