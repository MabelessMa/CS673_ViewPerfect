package org.example.model;


    import java.util.List;

    public class Hall {
        private int id;
        private String name;
        private int capacity;
        private List<Seat> seats;

        public Hall() {}

        public Hall(int id, String name, int capacity, List<Seat> seats) {
            this.id = id;
            this.name = name;
            this.capacity = capacity;
            this.seats = seats;
        }

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public int getCapacity() { return capacity; }
        public void setCapacity(int capacity) { this.capacity = capacity; }
        public List<Seat> getSeats() { return seats; }
        public void setSeats(List<Seat> seats) { this.seats = seats; }
    }

