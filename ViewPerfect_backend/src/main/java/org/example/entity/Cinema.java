package org.example.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaId;

    private String name;
    private String address;
    private String phone;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cinema_id")
    private List<Hall> halls;

    // Getters & Setters

    public Integer getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(Integer cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Hall> getHalls() {
        return halls;
    }

    public void setHalls(List<Hall> halls) {
        this.halls = halls;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
