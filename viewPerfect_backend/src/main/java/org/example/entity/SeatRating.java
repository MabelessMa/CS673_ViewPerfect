package org.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat_experience_ratings")
public class SeatRating {

    @EmbeddedId
    private SeatRatingId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("seatId")
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "rating")
    private Integer rating;

    public SeatRating() {}

    public SeatRating(Seat seat, Order order, Integer rating) {
        this.id = new SeatRatingId(order.getOrderId(), seat.getSeatId());
        this.seat = seat;
        this.order = order;
        this.rating = rating;
    }

    public SeatRatingId getId() {
        return id;
    }

    public void setId(SeatRatingId id) {
        this.id = id;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
