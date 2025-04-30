package org.example.entity;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class SeatRatingId implements Serializable {
    private Integer orderId;
    private String seatId;

    public SeatRatingId() {}

    public SeatRatingId(Integer orderId, String seatId) {
        this.orderId = orderId;
        this.seatId = seatId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SeatRatingId)) return false;
        SeatRatingId that = (SeatRatingId) o;
        return Objects.equals(orderId, that.orderId) && Objects.equals(seatId, that.seatId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, seatId);
    }
}

