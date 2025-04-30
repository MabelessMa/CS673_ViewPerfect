
package org.example.dto;

public class SeatBookingRequest {

    private String rowNumber;
    private Integer seatNumber;
    private Integer orderId;  // 注意是 orderId，不是 seat 自己的

    // Getter and Setter
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

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
}