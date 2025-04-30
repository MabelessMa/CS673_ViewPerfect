package org.example.dto;

public class SeatDTO {
    private String rowNumber;
    private Integer seatNumber;
    private String status;
    private double overallScore;
    private String seatId;

    public SeatDTO() {}

    public SeatDTO(String rowNumber, Integer seatNumber, String status, double overallScore,String seatId) {
        this.rowNumber = rowNumber;
        this.seatNumber = seatNumber;
        this.status = status;
        this.overallScore = overallScore;
        this.seatId = seatId;
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

    public double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }

    public String getSeatId() {
        return seatId;
    }
    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }
}
