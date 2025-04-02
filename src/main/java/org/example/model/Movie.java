package org.example.model;
import java.util.ArrayList;
import java.util.List;

public class Movie {
    private int id;
    private String title;
    private String time;
    private String director;
    private String price;
    private String image;
    private String description;
    private List<Integer> ratings = new ArrayList<>();

    public Movie() {}

    public Movie(int id, String title, String time, String director, String price, String image, String description) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.director = director;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<Integer> getRatings() { return ratings; }
    public void setRatings(List<Integer> ratings) { this.ratings = ratings; }

    public void addRating(int rating) {
        this.ratings.add(rating);
    }

    public double getAverageRating() {
        return ratings.isEmpty() ? 0 : ratings.stream().mapToInt(Integer::intValue).average().orElse(0);
    }
}