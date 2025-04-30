package org.example.controller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.example.dto.OrderCreateRequest;
import org.example.dto.OrderSummaryDTO;
import org.example.entity.*;
import org.example.entity.Order.OrderStatus;
import org.example.repository.OrderRepository;
import org.example.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private SeatRepository seatRepo;

    @PersistenceContext
    private EntityManager entityManager;


    /**
     * 下单接口（创建订单并绑定座位）
     */
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderCreateRequest request) {
        Order order = new Order();
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PAID);

        // 获取当前登录用户
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        order.setUser(user);

        order.setSchedule(entityManager.getReference(Schedule.class, request.getScheduleId()));

        if (request.getCouponId() != null) {
            order.setCoupon(entityManager.getReference(Coupon.class, request.getCouponId()));
        }

        if (request.getSeatIds() != null && !request.getSeatIds().isEmpty()) {
            List<Seat> seats = seatRepo.findAllById(request.getSeatIds());
            for (Seat seat : seats) {
                seat.setStatus(Seat.SeatStatus.BOOKED);
            }
            seatRepo.saveAll(seats); order.setSeats(seats);
        }

        Order saved = orderRepo.save(order);
        return ResponseEntity.ok(Map.of("orderId", saved.getOrderId()));
    }



    /**
     * 获取用户订单列表接口
     */
    @GetMapping
    public ResponseEntity<List<OrderSummaryDTO>> getUserOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 可选安全校验
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 获取当前登录用户（前提是 principal 是 User 类型）
        User user = (User) authentication.getPrincipal();

        // 查询该用户的所有订单
        List<Order> orders = orderRepo.findByUserUserId(user.getUserId());

        // 构造 DTO 列表
        List<OrderSummaryDTO> dtos = orders.stream().map(order -> {
            OrderSummaryDTO dto = new OrderSummaryDTO();
            dto.setOrderId(order.getOrderId());
            dto.setMovie(order.getSchedule().getMovie().getTitle());

            dto.setCinema(order.getSchedule().getHall().getName());

            dto.setTime(order.getSchedule().getStartTime().toString());

            dto.setSeats(
                    order.getSeats().stream()
                            .map(Seat::getSeatId)
                            .toList()
            );
            dto.setStatus(order.getStatus().name());

            return dto;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    /**
     * 取消订单接口
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        return orderRepo.findByOrderId(id).map(order -> {
            List<Seat> seats = order.getSeats();
            for (Seat seat : seats) {
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
            }
            seatRepo.saveAll(seats); // 保存修改
            orderRepo.delete(order);
            return ResponseEntity.ok("Order deleted");
        }).orElse(ResponseEntity.notFound().build());
    }

}
