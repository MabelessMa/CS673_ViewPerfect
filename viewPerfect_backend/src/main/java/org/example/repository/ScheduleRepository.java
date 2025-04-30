package org.example.repository;

import org.example.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    // 可加一些扩展方法，例如按电影查询排片
    List<Schedule> findByMovieMovieId(Integer movieId);

    List<Schedule> findByHallHallId(Integer hallId);
}
