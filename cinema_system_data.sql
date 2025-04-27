USE CinemaSystem;

-- 插入 User（共7个）
INSERT INTO User (username, password, email, phone, loyalty_points, role, avatar) VALUES
('alice', 'password123', 'alice@example.com', '1234567890', 100, 'user', 'https://example.com/avatars/alice.png'),
('bob', 'password456', 'bob@example.com', '2345678901', 200, 'user', 'https://example.com/avatars/bob.png'),
('charlie', 'password789', 'charlie@example.com', '3456789012', 150, 'admin', 'https://example.com/avatars/charlie.png'),
('david', 'password321', 'david@example.com', '4567890123', 120, 'user', 'https://example.com/avatars/david.png'),
('emma', 'password654', 'emma@example.com', '5678901234', 180, 'user', 'https://example.com/avatars/emma.png'),
('frank', 'password987', 'frank@example.com', '6789012345', 300, 'user', 'https://example.com/avatars/frank.png'),
('grace', 'passwordabc', 'grace@example.com', '7890123456', 50, 'user', 'https://example.com/avatars/grace.png');

-- 插入 Movie（共7部）
INSERT INTO Movie (title, description, cast, release_date, duration, price, genre, language, poster) VALUES
('Avengers: Endgame', 'The epic conclusion to the Avengers saga.', 'Robert Downey Jr., Chris Evans', '2019-04-26', 181, 15.00, 'Action', 'English', 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'),
('Inception', 'A mind-bending thriller about dreams within dreams.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16', 148, 12.50, 'Sci-Fi', 'English', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'),
('Your Name', 'A touching story about two teenagers swapping bodies.', 'Ryunosuke Kamiki, Mone Kamishiraishi', '2016-08-26', 106, 10.00, 'Animation', 'Japanese', 'https://image.tmdb.org/t/p/w500/xq1Ugd62d23K2knRU0J1y2JvT4h.jpg'),
('Interstellar', 'A journey through space and time to save humanity.', 'Matthew McConaughey, Anne Hathaway', '2014-11-07', 169, 14.00, 'Sci-Fi', 'English', 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'),
('Parasite', 'A dark comedy thriller about two families.', 'Song Kang-ho, Lee Sun-kyun', '2019-05-30', 132, 13.00, 'Drama', 'Korean', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'),
('Coco', 'An animated film about family and music.', 'Anthony Gonzalez, Gael García Bernal', '2017-10-20', 105, 11.00, 'Animation', 'English', 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'),
('Spirited Away', 'A fantasy tale of a young girl trapped in a magical world.', 'Rumi Hiiragi, Miyu Irino', '2001-07-20', 125, 12.00, 'Animation', 'Japanese', 'https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg');

-- 插入 Hall（共4个）
INSERT INTO Hall (name, capacity, layout) VALUES
('Hall A', 100, '{"rows":10, "columns":10}'),
('Hall B', 80, '{"rows":8, "columns":10}'),
('Hall C', 120, '{"rows":12, "columns":10}'),
('Hall D', 150, '{"rows":15, "columns":10}');

-- 插入 Schedule（共7场）
INSERT INTO Schedule (movie_id, hall_id, start_time, end_time, available_seats) VALUES
(1, 1, '2025-05-01 19:00:00', '2025-05-01 22:00:00', 100),
(2, 2, '2025-05-02 18:00:00', '2025-05-02 21:00:00', 80),
(3, 1, '2025-05-03 14:00:00', '2025-05-03 16:00:00', 100),
(4, 3, '2025-05-04 17:00:00', '2025-05-04 20:00:00', 120),
(5, 4, '2025-05-05 19:00:00', '2025-05-05 21:30:00', 150),
(6, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 120),
(7, 4, '2025-05-07 14:00:00', '2025-05-07 16:00:00', 150);

-- 插入 Review（共7条）
INSERT INTO Review (user_id, movie_id, rating, comment, review_time, helpful_votes) VALUES
(1, 1, 5, 'Absolutely loved it! A masterpiece.', '2025-04-25 10:00:00', 10),
(2, 2, 4, 'Really makes you think!', '2025-04-26 15:30:00', 5),
(3, 3, 5, 'So beautiful and emotional.', '2025-04-27 12:00:00', 8),
(4, 4, 5, 'A visually stunning masterpiece.', '2025-04-28 11:00:00', 12),
(5, 5, 4, 'Such a clever plot!', '2025-04-28 14:30:00', 6),
(6, 6, 5, 'Heartwarming and colorful.', '2025-04-29 09:00:00', 15),
(7, 7, 5, 'A magical journey!', '2025-04-29 13:00:00', 9);

-- 插入 Coupon（共6张）
INSERT INTO Coupon (user_id, code, discount, expiry_date, status) VALUES
(1, 'DISCOUNT10', 10.00, '2025-06-01', 'unused'),
(2, 'SAVE5', 5.00, '2025-05-20', 'unused'),
(4, 'NEWYEAR20', 20.00, '2025-12-31', 'unused'),
(5, 'SPRING5', 5.00, '2025-06-01', 'unused'),
(6, 'MOVIEBUFF15', 15.00, '2025-07-01', 'unused'),
(7, 'WEEKEND10', 10.00, '2025-05-30', 'unused');

-- 插入 Order（共6单）
INSERT INTO `Order` (user_id, schedule_id, order_time, status, coupon_id) VALUES
(1, 1, '2025-04-26 09:00:00', 'paid', 1),
(2, 2, '2025-04-26 14:00:00', 'paid', 2),
(4, 4, '2025-04-28 10:00:00', 'paid', 3),
(5, 5, '2025-04-28 13:00:00', 'paid', 4),
(6, 6, '2025-04-29 08:00:00', 'paid', 5),
(7, 7, '2025-04-29 12:00:00', 'paid', 6);

-- 插入 OrderSeat（共12座位）
INSERT INTO OrderSeat (order_id, seat_id) VALUES
(1, 'A1'), (1, 'A2'),
(2, 'B5'), (2, 'B6'),
(3, 'C1'), (3, 'C2'),
(4, 'D10'), (4, 'D11'),
(5, 'C5'), (5, 'C6'),
(6, 'D20'), (6, 'D21');

-- 插入 Payment（共6笔）
INSERT INTO Payment (order_id, payment_method, amount, payment_time, status) VALUES
(1, 'credit_card', 20.00, '2025-04-26 09:05:00', 'success'),
(2, 'paypal', 15.00, '2025-04-26 14:05:00', 'success'),
(3, 'applepay', 25.00, '2025-04-28 10:05:00', 'success'),
(4, 'credit_card', 18.00, '2025-04-28 13:05:00', 'success'),
(5, 'paypal', 20.00, '2025-04-29 08:05:00', 'success'),
(6, 'credit_card', 22.00, '2025-04-29 12:05:00', 'success');

-- 插入 Category（共6种）
INSERT INTO Category (name) VALUES
('Action'),
('Sci-Fi'),
('Animation'),
('Drama'),
('Adventure'),
('Fantasy');

-- 插入 MovieCategory（共7条关系）
INSERT INTO MovieCategory (movie_id, category_id) VALUES
(1, 1), -- Avengers: Action
(2, 2), -- Inception: Sci-Fi
(3, 3), -- Your Name: Animation
(4, 2), -- Interstellar: Sci-Fi
(5, 4), -- Parasite: Drama
(6, 3), -- Coco: Animation
(7, 6); -- Spirited Away: Fantasy

-- 插入 Admin（共2个）
INSERT INTO Admin (username, password, email, role) VALUES
('admin1', 'adminpass1', 'admin1@example.com', 'super_admin'),
('admin2', 'adminpass2', 'admin2@example.com', 'admin');
