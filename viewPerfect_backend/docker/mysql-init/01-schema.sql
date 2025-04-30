-- 1. 删掉旧库并重建
DROP DATABASE IF EXISTS cinemasystem;
CREATE DATABASE IF NOT EXISTS cinemasystem;
USE cinemasystem;

-- 2. 用户表
CREATE TABLE `user` (
    user_id         INT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    phone           VARCHAR(15),
    loyalty_points  INT          DEFAULT 0,
    role            ENUM('user','admin') DEFAULT 'user',
    avatarUrl          VARCHAR(255)
);

-- 3. 电影表
CREATE TABLE `movie` (
     movie_id     INT AUTO_INCREMENT PRIMARY KEY,
     title        VARCHAR(100) NOT NULL UNIQUE,
     description  TEXT,
     cast         TEXT,
     release_date DATE,
     duration     INT,
     price        DECIMAL(10,2),
     genre        VARCHAR(50),
     language     VARCHAR(50),
     image_url       VARCHAR(255)
);

-- 4. 影厅表
CREATE TABLE `hall` (
    hall_id  INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    capacity INT          NOT NULL,
    layout   JSON
);

-- 5. 排片表
CREATE TABLE `schedule` (
    schedule_id     INT AUTO_INCREMENT PRIMARY KEY,
    movie_id        INT NOT NULL,
    hall_id         INT NOT NULL,
    start_time      DATETIME NOT NULL,
    end_time        DATETIME NOT NULL,
    available_seats INT NOT NULL,
    CONSTRAINT fk_schedule_movie FOREIGN KEY (movie_id) REFERENCES `movie`(movie_id) ON DELETE CASCADE,
    CONSTRAINT fk_schedule_hall  FOREIGN KEY (hall_id)  REFERENCES `hall`(hall_id)   ON DELETE CASCADE
);

-- 6. 评论表
CREATE TABLE `review` (
  review_id    INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  movie_id     INT NOT NULL,
  rating       INT CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  review_time  DATETIME NOT NULL,
  helpful_votes INT DEFAULT 0,
  CONSTRAINT fk_review_user  FOREIGN KEY (user_id)  REFERENCES `user`(user_id)  ON DELETE CASCADE,
  CONSTRAINT fk_review_movie FOREIGN KEY (movie_id) REFERENCES `movie`(movie_id) ON DELETE CASCADE
);

-- 7. 优惠券表
CREATE TABLE `coupon` (
      coupon_id   INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT NOT NULL,
      code        VARCHAR(50) NOT NULL UNIQUE,
      discount    DECIMAL(10,2) NOT NULL,
      expiry_date DATE NOT NULL,
      status      ENUM('unused','used','expired') DEFAULT 'unused',
      CONSTRAINT fk_coupon_user FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE
);

-- 8. 订单表
CREATE TABLE `order` (
     order_id    INT AUTO_INCREMENT PRIMARY KEY,
     user_id     INT NOT NULL,
     schedule_id INT NOT NULL,
     order_time  DATETIME NOT NULL,
     status ENUM('unpaid', 'paid', 'canceled', 'completed') DEFAULT 'unpaid',
     coupon_id   INT,
     CONSTRAINT fk_order_user     FOREIGN KEY (user_id)     REFERENCES `user`(user_id)      ON DELETE CASCADE,
     CONSTRAINT fk_order_schedule FOREIGN KEY (schedule_id) REFERENCES `schedule`(schedule_id) ON DELETE CASCADE,
     CONSTRAINT fk_order_coupon   FOREIGN KEY (coupon_id)   REFERENCES `coupon`(coupon_id)    ON DELETE SET NULL
);

CREATE TABLE seat (
    seat_id VARCHAR(50) PRIMARY KEY, -- 主键，seatId
    hall_id INT NOT NULL,             -- 外键，关联到Hall表
    row_num VARCHAR(10),              -- 行号，对应rowNumber
    column_num INT,                   -- 列号，对应seatNumber
    status ENUM('AVAILABLE', 'BOOKED', 'BROKEN') DEFAULT 'AVAILABLE', -- 状态枚举
    overall_score DOUBLE,             -- 综合评分
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id) -- 外键约束
);

-- 10. 支付表
CREATE TABLE `payment` (
   payment_id     INT AUTO_INCREMENT PRIMARY KEY,
   order_id       INT NOT NULL,
   payment_method ENUM('credit_card','applepay','paypal') NOT NULL,
   amount         DECIMAL(10,2) NOT NULL,
   payment_time   DATETIME NOT NULL,
   status         ENUM('success','failed','pending') DEFAULT 'pending',
   CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES `order`(order_id) ON DELETE CASCADE
);

-- 11. 类别表
CREATE TABLE `category` (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE
);

-- 12. 电影类别关联表
CREATE TABLE `moviecategory` (
     movie_id    INT NOT NULL,
     category_id INT NOT NULL,
     PRIMARY KEY(movie_id, category_id),
     CONSTRAINT fk_movcat_movie    FOREIGN KEY (movie_id)    REFERENCES `movie`(movie_id)    ON DELETE CASCADE,
     CONSTRAINT fk_movcat_category FOREIGN KEY (category_id) REFERENCES `category`(category_id) ON DELETE CASCADE
);

-- 13. 管理员表
CREATE TABLE `admin` (
 admin_id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(50) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 email    VARCHAR(100) NOT NULL UNIQUE,
 role     ENUM('super_admin','admin') DEFAULT 'admin'
);

CREATE TABLE seat_experience_ratings (
     seat_id VARCHAR(50) NOT NULL,
     order_id INT NOT NULL,
     rating INT NOT NULL,
     PRIMARY KEY (seat_id, order_id),
     CONSTRAINT fk_seat_rating_seat FOREIGN KEY (seat_id) REFERENCES seat(seat_id) ON DELETE CASCADE,
     CONSTRAINT fk_seat_rating_order FOREIGN KEY (order_id) REFERENCES `order`(order_id) ON DELETE CASCADE
);


CREATE TABLE order_seat (
    seat_id VARCHAR(50),
    order_id INT,
    PRIMARY KEY (seat_id, order_id),
    FOREIGN KEY (seat_id) REFERENCES seat(seat_id),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id)
);

CREATE TABLE schedule_seat (
    seat_id VARCHAR(50),
    schedule_id INT,
    PRIMARY KEY (seat_id, schedule_id),
    FOREIGN KEY (seat_id) REFERENCES seat(seat_id),
    FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)
);
