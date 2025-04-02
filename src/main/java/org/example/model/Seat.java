package org.example.model;

import java.util.ArrayList;
import java.util.List;

public class Seat {
    private int row;
    private int number;
    private boolean occupied;
    private List<Integer> experienceRatings = new ArrayList<>();

    public Seat() {}

    public Seat(int row, int number, boolean occupied) {
        this.row = row;
        this.number = number;
        this.occupied = occupied;
    }

    public int getRow() { return row; }
    public void setRow(int row) { this.row = row; }
    public int getNumber() { return number; }
    public void setNumber(int number) { this.number = number; }
    public boolean isOccupied() { return occupied; }
    public void setOccupied(boolean occupied) { this.occupied = occupied; }
    public List<Integer> getExperienceRatings() { return experienceRatings; }
    public void setExperienceRatings(List<Integer> experienceRatings) { this.experienceRatings = experienceRatings; }
    public void addExperienceRating(int rating) { this.experienceRatings.add(rating); }
    public double getAverageExperienceRating() {
        return experienceRatings.isEmpty() ? 0 : experienceRatings.stream().mapToInt(Integer::intValue).average().orElse(0);
    }
}
