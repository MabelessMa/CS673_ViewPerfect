DROP DATABASE IF EXISTS CinemaSystem;
-- create database
CREATE DATABASE IF NOT EXISTS CinemaSystem;
USE CinemaSystem;

-- User
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    loyalty_points INT DEFAULT 0,
    role ENUM('user', 'admin') DEFAULT 'user',
    avatar VARCHAR(255) -- user avatar URL
);

-- Movie
CREATE TABLE Movie (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    cast TEXT,
    release_date DATE,
    duration INT,
    price DECIMAL(10, 2),
    genre VARCHAR(50),
    language VARCHAR(50),
    poster VARCHAR(255) -- poster URL
);

-- Hall
CREATE TABLE Hall (
    hall_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    layout JSON
);

-- Schedule
CREATE TABLE Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    hall_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    available_seats INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (hall_id) REFERENCES Hall(hall_id) ON DELETE CASCADE
);

-- Review
CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_time DATETIME NOT NULL,
    helpful_votes INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE
);

-- Coupon
CREATE TABLE Coupon (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE, 
    discount DECIMAL(10, 2) NOT NULL,
    expiry_date DATE NOT NULL,
    status ENUM('unused', 'used', 'expired') DEFAULT 'unused',
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- Order
CREATE TABLE `Order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    schedule_id INT NOT NULL,
    order_time DATETIME NOT NULL,
    status ENUM('paid', 'canceled', 'completed') DEFAULT 'paid',
    coupon_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id) ON DELETE CASCADE,
    FOREIGN KEY (coupon_id) REFERENCES Coupon(coupon_id) ON DELETE SET NULL
);

-- OrderSeat
CREATE TABLE OrderSeat (
    order_id INT NOT NULL,
    seat_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (order_id, seat_id),
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON DELETE CASCADE
);

-- Payment
CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method ENUM('credit_card', 'applepay', 'paypal') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_time DATETIME NOT NULL,
    status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON DELETE CASCADE
);

-- Category
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- MovieCategory
CREATE TABLE MovieCategory (
    movie_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (movie_id, category_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE CASCADE
);

-- Admin
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('super_admin', 'admin') DEFAULT 'admin'
);