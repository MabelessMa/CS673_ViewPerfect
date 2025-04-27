package org.example.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    private String title;

    @Column(length = 1000)
    private String description;

    private String cast;
    private Date releaseDate;
    private Integer duration;  // 单位：分钟
    private Double price;
    private String genre;
    private String language;

    @ElementCollection
    private List<Integer> ratings = new ArrayList<>();

    // 业务逻辑方法
    public double getAverageRating() {
        return ratings.isEmpty() ? 0 : ratings.stream().mapToInt(Integer::intValue).average().orElse(0);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public List<Integer> getRatings() {
        return ratings;
    }

    public void setRatings(List<Integer> ratings) {
        this.ratings = ratings;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
// Getters & Setters
}
