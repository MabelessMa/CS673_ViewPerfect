package org.example.dto;

public class HallDTO {
    private Integer hallId;
    private String name;
    private Integer capacity;

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public HallDTO(Integer hallId, String name, Integer capacity) {
        this.hallId = hallId;
        this.name = name;
        this.capacity = capacity;
    }

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
}
