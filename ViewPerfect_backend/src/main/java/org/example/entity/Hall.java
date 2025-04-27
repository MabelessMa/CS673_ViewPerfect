package org.example.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hallId;

    private String name;

    private Integer capacity;

    private String type;   // 新增：影厅类型（如 IMAX, 4D 等）

    // 关联 Cinema：多对一关系
    @ManyToOne
    @JoinColumn(name = "cinema_id")
    private Cinema cinema;

    // 关联 Seat：一对多关系
    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL)
    private List<Seat> seats;

    public Hall() {}

    // Getters & Setters

    public Integer getHallId() {
        return hallId;
    }

    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }
}

