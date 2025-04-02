package org.example.controller;

import org.example.model.Hall;
import org.example.model.Seat;
import org.example.model.Cinema;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin
public class RatingController {

    private final Map<Integer, Cinema> cinemaMap = new HashMap<>();

    @PostMapping("/cinema/{cinemaId}/hall/{hallId}/seat")
    public String rateSeat(@PathVariable int cinemaId, @PathVariable int hallId,
                           @RequestParam int row, @RequestParam int number,
                           @RequestParam int rating) {

        Cinema cinema = cinemaMap.get(cinemaId);
        if (cinema == null) return "Cinema not found";

        Hall hall = cinema.getHalls().stream().filter(h -> h.getId() == hallId).findFirst().orElse(null);
        if (hall == null) return "Hall not found";

        Seat seat = hall.getSeats().stream()
                .filter(s -> s.getRow() == row && s.getNumber() == number)
                .findFirst().orElse(null);

        if (seat == null) return "Seat not found";

        seat.addExperienceRating(rating);
        return "Rating submitted successfully.";
    }

    @GetMapping("/cinema/{cinemaId}/hall/{hallId}/seat")
    public Double getSeatAverageRating(@PathVariable int cinemaId, @PathVariable int hallId,
                                       @RequestParam int row, @RequestParam int number) {

        Cinema cinema = cinemaMap.get(cinemaId);
        if (cinema == null) return null;

        Hall hall = cinema.getHalls().stream().filter(h -> h.getId() == hallId).findFirst().orElse(null);
        if (hall == null) return null;

        Seat seat = hall.getSeats().stream()
                .filter(s -> s.getRow() == row && s.getNumber() == number)
                .findFirst().orElse(null);

        if (seat == null) return null;

        return seat.getAverageExperienceRating();
    }
}