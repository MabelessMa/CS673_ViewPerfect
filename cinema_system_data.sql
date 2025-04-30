USE cs673viewperfect;

-- 插入 User（7个用户，avatarUrl字段名修正）
INSERT INTO `user` (username, password, email, phone, loyalty_points, role, avatarUrl) VALUES
('alice', 'password123', 'alice@example.com', '1234567890', 100, 'user', 'https://example.com/avatars/alice.png'),
('bob', 'password456', 'bob@example.com', '2345678901', 200, 'user', 'https://example.com/avatars/bob.png'),
('charlie', 'password789', 'charlie@example.com', '3456789012', 150, 'admin', 'https://example.com/avatars/charlie.png'),
('david', 'password321', 'david@example.com', '4567890123', 120, 'user', 'https://example.com/avatars/david.png'),
('emma', 'password654', 'emma@example.com', '5678901234', 180, 'user', 'https://example.com/avatars/emma.png'),
('frank', 'password987', 'frank@example.com', '6789012345', 300, 'user', 'https://example.com/avatars/frank.png'),
('grace', 'passwordabc', 'grace@example.com', '7890123456', 50, 'user', 'https://example.com/avatars/grace.png');


-- 插入 Movie（7部电影，imageUrl字段名修正）
INSERT INTO movie (title, description, cast, release_date, duration, price, genre, language, image_url) VALUES
('Avengers: Endgame', 'The epic conclusion to the Avengers saga.', 'Robert Downey Jr., Chris Evans', '2019-04-26', 181, 15.00, 'Action', 'English', 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'),
('Inception', 'A mind-bending thriller about dreams within dreams.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16', 148, 12.50, 'Sci-Fi', 'English', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'),
('Your Name', 'A touching story about two teenagers swapping bodies.', 'Ryunosuke Kamiki, Mone Kamishiraishi', '2016-08-26', 106, 10.00, 'Animation', 'Japanese', 'https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg'),
('Interstellar', 'A journey through space and time to save humanity.', 'Matthew McConaughey, Anne Hathaway', '2014-11-07', 169, 14.00, 'Sci-Fi', 'English', 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
('Parasite', 'A dark comedy thriller about two families.', 'Song Kang-ho, Lee Sun-kyun', '2019-05-30', 132, 13.00, 'Drama', 'Korean', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'),
('Coco', 'An animated film about family and music.', 'Anthony Gonzalez, Gael García Bernal', '2017-10-20', 105, 11.00, 'Animation', 'English', 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'),
('Spirited Away', 'A fantasy tale of a young girl trapped in a magical world.', 'Rumi Hiiragi, Miyu Irino', '2001-07-20', 125, 12.00, 'Animation', 'Japanese', 'https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg');

-- 插入 Hall（补全 type 为地址）
INSERT INTO hall (name, capacity, layout, type) VALUES
('Magic Movie', 30, '{"rows":6, "columns":5}', '123 Magic Ave, Boston, MA'),
('Cherry Hill Cinema', 48, '{"rows":8, "columns":6}', '456 Cherry Hill Rd, Boston, MA'),
('Chestnut St Cinima', 35, '{"rows":7, "columns":5}', '789 Chestnut St, Boston, MA'),
('Movie and Life', 40, '{"rows": 8, "columns": 5}', '321 Movie Blvd, Boston, MA'),
('Best Cinema', 45, '{"rows": 9, "columns": 5}', '654 Best Way, Boston, MA'),
('Moviegoers house', 50, '{"rows": 10, "columns": 5}', '987 Cinema Ln, Boston, MA');

-- 插入 Schedule
INSERT INTO schedule (movie_id, hall_id, start_time, end_time, available_seats) VALUES
(1, 1, '2025-05-01 19:00:00', '2025-05-01 22:00:00', 30),
(1, 2, '2025-05-02 18:00:00', '2025-05-02 21:00:00', 48),
(1, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35),
(1, 3, '2025-05-04 17:00:00', '2025-05-01 20:00:00', 35),
(1, 3, '2025-05-05 19:00:00', '2025-05-01 21:30:00', 35),
(2, 2, '2025-05-02 18:00:00', '2025-05-02 21:00:00', 48),
(2, 3, '2025-05-05 19:00:00', '2025-05-05 21:30:00', 35),
(2, 1, '2025-05-03 14:00:00', '2025-05-03 16:00:00', 30),
(2, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35),
(3, 1, '2025-05-03 14:00:00', '2025-05-03 16:00:00', 30),
(3, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35),
(3, 3, '2025-05-05 19:00:00', '2025-05-05 21:30:00', 35),
(3, 1, '2025-05-03 14:00:00', '2025-05-03 16:00:00', 30),
(3, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35),
(4, 3, '2025-05-04 17:00:00', '2025-05-04 20:00:00', 35),
(5, 3, '2025-05-05 19:00:00', '2025-05-05 21:30:00', 35),
(6, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35),
(7, 3, '2025-05-07 14:00:00', '2025-05-07 16:00:00', 35),
(7, 3, '2025-05-06 13:00:00', '2025-05-06 15:00:00', 35);

-- 插入 Review
INSERT INTO review (user_id, movie_id, rating, comment, review_time, helpful_votes) VALUES
(1, 1, 5, 'Absolutely loved it! A masterpiece.', '2025-04-25 10:00:00', 10),
(2, 2, 4, 'Really makes you think!', '2025-04-26 15:30:00', 5),
(3, 3, 5, 'So beautiful and emotional.', '2025-04-27 12:00:00', 8),
(4, 4, 5, 'A visually stunning masterpiece.', '2025-04-28 11:00:00', 12),
(5, 5, 4, 'Such a clever plot!', '2025-04-28 14:30:00', 6),
(6, 6, 5, 'Heartwarming and colorful.', '2025-04-29 09:00:00', 15),
(7, 7, 5, 'A magical journey!', '2025-04-29 13:00:00', 9);

-- 插入 Coupon
INSERT INTO coupon (user_id, code, discount, expiry_date, status) VALUES
(1, 'DISCOUNT10', 10.00, '2025-06-01', 'unused'),
(2, 'SAVE5', 5.00, '2025-05-20', 'unused'),
(4, 'NEWYEAR20', 20.00, '2025-12-31', 'unused'),
(5, 'SPRING5', 5.00, '2025-06-01', 'unused'),
(6, 'MOVIEBUFF15', 15.00, '2025-07-01', 'unused'),
(7, 'WEEKEND10', 10.00, '2025-05-30', 'unused');

-- 插入 Order（注意默认status改为unpaid了）
INSERT INTO `order` (user_id, schedule_id, order_time, status, coupon_id) VALUES
(1, 1, '2025-04-26 09:00:00', 'paid', 1),
(2, 2, '2025-04-26 14:00:00', 'paid', 2),
(4, 4, '2025-04-28 10:00:00', 'paid', 3),
(5, 5, '2025-04-28 13:00:00', 'paid', 4),
(6, 6, '2025-04-29 08:00:00', 'paid', 5),
(7, 7, '2025-04-29 12:00:00', 'paid', 6);

-- Hall A (hall_id = 1, 6x5)
INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
('H1_A1', 1, 1, 1, 'AVAILABLE', 8.0), ('H1_A2', 1, 1, 2, 'AVAILABLE', 8.0), ('H1_A3', 1, 1, 3, 'AVAILABLE', 8.5), ('H1_A4', 1, 1, 4, 'AVAILABLE', 8.0), ('H1_A5', 1, 1, 5, 'AVAILABLE', 8.0),
('H1_B1', 1, 2, 1, 'AVAILABLE', 8.0), ('H1_B2', 1, 2, 2, 'AVAILABLE', 8.0), ('H1_B3', 1, 2, 3, 'AVAILABLE', 8.5), ('H1_B4', 1, 2, 4, 'AVAILABLE', 8.0), ('H1_B5', 1, 2, 5, 'AVAILABLE', 8.0),
('H1_C1', 1, 3, 1, 'AVAILABLE', 8.0), ('H1_C2', 1, 3, 2, 'AVAILABLE', 8.0), ('H1_C3', 1, 3, 3, 'AVAILABLE', 8.5), ('H1_C4', 1, 3, 4, 'AVAILABLE', 8.0), ('H1_C5', 1, 3, 5, 'AVAILABLE', 8.0),
('H1_D1', 1, 4, 1, 'AVAILABLE', 7.5), ('H1_D2', 1, 4, 2, 'AVAILABLE', 7.5), ('H1_D3', 1, 4, 3, 'AVAILABLE', 8.0), ('H1_D4', 1, 4, 4, 'AVAILABLE', 7.5), ('H1_D5', 1, 4, 5, 'AVAILABLE', 7.5),
('H1_E1', 1, 5, 1, 'AVAILABLE', 7.0), ('H1_E2', 1, 5, 2, 'AVAILABLE', 7.0), ('H1_E3', 1, 5, 3, 'AVAILABLE', 7.5), ('H1_E4', 1, 5, 4, 'AVAILABLE', 7.0), ('H1_E5', 1, 5, 5, 'AVAILABLE', 7.0),
('H1_F1', 1, 6, 1, 'AVAILABLE', 7.0), ('H1_F2', 1, 6, 2, 'AVAILABLE', 7.0), ('H1_F3', 1, 6, 3, 'AVAILABLE', 7.5), ('H1_F4', 1, 6, 4, 'AVAILABLE', 7.0), ('H1_F5', 1, 6, 5, 'AVAILABLE', 7.0);

-- Hall B (hall_id = 2, 8x6)
INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
('H2_A1', 2, 1, 1, 'AVAILABLE', 8.0), ('H2_A2', 2, 1, 2, 'AVAILABLE', 8.0), ('H2_A3', 2, 1, 3, 'AVAILABLE', 8.5), ('H2_A4', 2, 1, 4, 'AVAILABLE', 8.5), ('H2_A5', 2, 1, 5, 'AVAILABLE', 8.0), ('H2_A6', 2, 1, 6, 'AVAILABLE', 8.0),
('H2_B1', 2, 2, 1, 'AVAILABLE', 8.0), ('H2_B2', 2, 2, 2, 'AVAILABLE', 8.0), ('H2_B3', 2, 2, 3, 'AVAILABLE', 8.5), ('H2_B4', 2, 2, 4, 'AVAILABLE', 8.5), ('H2_B5', 2, 2, 5, 'AVAILABLE', 8.0), ('H2_B6', 2, 2, 6, 'AVAILABLE', 8.0),
('H2_C1', 2, 3, 1, 'AVAILABLE', 8.0), ('H2_C2', 2, 3, 2, 'AVAILABLE', 8.0), ('H2_C3', 2, 3, 3, 'AVAILABLE', 8.5), ('H2_C4', 2, 3, 4, 'AVAILABLE', 8.5), ('H2_C5', 2, 3, 5, 'AVAILABLE', 8.0), ('H2_C6', 2, 3, 6, 'AVAILABLE', 8.0),
('H2_D1', 2, 4, 1, 'AVAILABLE', 7.5), ('H2_D2', 2, 4, 2, 'AVAILABLE', 7.5), ('H2_D3', 2, 4, 3, 'AVAILABLE', 8.0), ('H2_D4', 2, 4, 4, 'AVAILABLE', 8.0), ('H2_D5', 2, 4, 5, 'AVAILABLE', 7.5), ('H2_D6', 2, 4, 6, 'AVAILABLE', 7.5),
('H2_E1', 2, 5, 1, 'AVAILABLE', 7.0), ('H2_E2', 2, 5, 2, 'AVAILABLE', 7.0), ('H2_E3', 2, 5, 3, 'AVAILABLE', 7.5), ('H2_E4', 2, 5, 4, 'AVAILABLE', 7.5), ('H2_E5', 2, 5, 5, 'AVAILABLE', 7.0), ('H2_E6', 2, 5, 6, 'AVAILABLE', 7.0),
('H2_F1', 2, 6, 1, 'AVAILABLE', 7.0), ('H2_F2', 2, 6, 2, 'AVAILABLE', 7.0), ('H2_F3', 2, 6, 3, 'AVAILABLE', 7.5), ('H2_F4', 2, 6, 4, 'AVAILABLE', 7.5), ('H2_F5', 2, 6, 5, 'AVAILABLE', 7.0), ('H2_F6', 2, 6, 6, 'AVAILABLE', 7.0),
('H2_G1', 2, 7, 1, 'AVAILABLE', 6.5), ('H2_G2', 2, 7, 2, 'AVAILABLE', 6.5), ('H2_G3', 2, 7, 3, 'AVAILABLE', 7.0), ('H2_G4', 2, 7, 4, 'AVAILABLE', 7.0), ('H2_G5', 2, 7, 5, 'AVAILABLE', 6.5), ('H2_G6', 2, 7, 6, 'AVAILABLE', 6.5),
('H2_H1', 2, 8, 1, 'AVAILABLE', 6.0), ('H2_H2', 2, 8, 2, 'AVAILABLE', 6.0), ('H2_H3', 2, 8, 3, 'AVAILABLE', 6.5), ('H2_H4', 2, 8, 4, 'AVAILABLE', 6.5), ('H2_H5', 2, 8, 5, 'AVAILABLE', 6.0), ('H2_H6', 2, 8, 6, 'AVAILABLE', 6.0);

-- Hall C (hall_id = 3, 7x5)
INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
('H3_A1', 3, 1, 1, 'AVAILABLE', 8.0), ('H3_A2', 3, 1, 2, 'AVAILABLE', 8.0), ('H3_A3', 3, 1, 3, 'AVAILABLE', 8.5), ('H3_A4', 3, 1, 4, 'AVAILABLE', 8.0), ('H3_A5', 3, 1, 5, 'AVAILABLE', 8.0),
('H3_B1', 3, 2, 1, 'AVAILABLE', 8.0), ('H3_B2', 3, 2, 2, 'AVAILABLE', 8.0), ('H3_B3', 3, 2, 3, 'AVAILABLE', 8.5), ('H3_B4', 3, 2, 4, 'AVAILABLE', 8.0), ('H3_B5', 3, 2, 5, 'AVAILABLE', 8.0),
('H3_C1', 3, 3, 1, 'AVAILABLE', 8.0), ('H3_C2', 3, 3, 2, 'AVAILABLE', 8.0), ('H3_C3', 3, 3, 3, 'AVAILABLE', 8.5), ('H3_C4', 3, 3, 4, 'AVAILABLE', 8.0), ('H3_C5', 3, 3, 5, 'AVAILABLE', 8.0),
('H3_D1', 3, 4, 1, 'AVAILABLE', 7.5), ('H3_D2', 3, 4, 2, 'AVAILABLE', 7.5), ('H3_D3', 3, 4, 3, 'AVAILABLE', 8.0), ('H3_D4', 3, 4, 4, 'AVAILABLE', 7.5), ('H3_D5', 3, 4, 5, 'AVAILABLE', 7.5),
('H3_E1', 3, 5, 1, 'AVAILABLE', 7.0), ('H3_E2', 3, 5, 2, 'AVAILABLE', 7.0), ('H3_E3', 3, 5, 3, 'AVAILABLE', 7.5), ('H3_E4', 3, 5, 4, 'AVAILABLE', 7.0), ('H3_E5', 3, 5, 5, 'AVAILABLE', 7.0),
('H3_F1', 3, 6, 1, 'AVAILABLE', 7.0), ('H3_F2', 3, 6, 2, 'AVAILABLE', 7.0), ('H3_F3', 3, 6, 3, 'AVAILABLE', 7.5), ('H3_F4', 3, 6, 4, 'AVAILABLE', 7.0), ('H3_F5', 3, 6, 5, 'AVAILABLE', 7.0),
('H3_G1', 3, 7, 1, 'AVAILABLE', 6.5), ('H3_G2', 3, 7, 2, 'AVAILABLE', 6.5), ('H3_G3', 3, 7, 3, 'AVAILABLE', 7.0), ('H3_G4', 3, 7, 4, 'AVAILABLE', 6.5), ('H3_G5', 3, 7, 5, 'AVAILABLE', 6.5);

INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
-- Hall D: 8x5 = 40 seats
('H4_A1', 4, 1, 1, 'AVAILABLE', 8.0), ('H4_A2', 4, 1, 2, 'AVAILABLE', 8.0), ('H4_A3', 4, 1, 3, 'AVAILABLE', 8.5), ('H4_A4', 4, 1, 4, 'AVAILABLE', 8.0), ('H4_A5', 4, 1, 5, 'AVAILABLE', 8.0),
('H4_B1', 4, 2, 1, 'AVAILABLE', 8.0), ('H4_B2', 4, 2, 2, 'AVAILABLE', 8.0), ('H4_B3', 4, 2, 3, 'AVAILABLE', 8.5), ('H4_B4', 4, 2, 4, 'AVAILABLE', 8.0), ('H4_B5', 4, 2, 5, 'AVAILABLE', 8.0),
('H4_C1', 4, 3, 1, 'AVAILABLE', 8.0), ('H4_C2', 4, 3, 2, 'AVAILABLE', 8.0), ('H4_C3', 4, 3, 3, 'AVAILABLE', 8.5), ('H4_C4', 4, 3, 4, 'AVAILABLE', 8.0), ('H4_C5', 4, 3, 5, 'AVAILABLE', 8.0),
('H4_D1', 4, 4, 1, 'AVAILABLE', 7.5), ('H4_D2', 4, 4, 2, 'AVAILABLE', 7.5), ('H4_D3', 4, 4, 3, 'AVAILABLE', 8.0), ('H4_D4', 4, 4, 4, 'AVAILABLE', 7.5), ('H4_D5', 4, 4, 5, 'AVAILABLE', 7.5),
('H4_E1', 4, 5, 1, 'AVAILABLE', 7.5), ('H4_E2', 4, 5, 2, 'AVAILABLE', 7.5), ('H4_E3', 4, 5, 3, 'AVAILABLE', 8.0), ('H4_E4', 4, 5, 4, 'AVAILABLE', 7.5), ('H4_E5', 4, 5, 5, 'AVAILABLE', 7.5),
('H4_F1', 4, 6, 1, 'AVAILABLE', 7.0), ('H4_F2', 4, 6, 2, 'AVAILABLE', 7.0), ('H4_F3', 4, 6, 3, 'AVAILABLE', 7.5), ('H4_F4', 4, 6, 4, 'AVAILABLE', 7.0), ('H4_F5', 4, 6, 5, 'AVAILABLE', 7.0),
('H4_G1', 4, 7, 1, 'AVAILABLE', 7.0), ('H4_G2', 4, 7, 2, 'AVAILABLE', 7.0), ('H4_G3', 4, 7, 3, 'AVAILABLE', 7.5), ('H4_G4', 4, 7, 4, 'AVAILABLE', 7.0), ('H4_G5', 4, 7, 5, 'AVAILABLE', 7.0),
('H4_H1', 4, 8, 1, 'AVAILABLE', 7.0), ('H4_H2', 4, 8, 2, 'AVAILABLE', 7.0), ('H4_H3', 4, 8, 3, 'AVAILABLE', 7.5), ('H4_H4', 4, 8, 4, 'AVAILABLE', 7.0), ('H4_H5', 4, 8, 5, 'AVAILABLE', 7.0);

INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
('H5_A1', 5, 1, 1, 'AVAILABLE', 8.0), ('H5_A2', 5, 1, 2, 'AVAILABLE', 8.0), ('H5_A3', 5, 1, 3, 'AVAILABLE', 8.5), ('H5_A4', 5, 1, 4, 'AVAILABLE', 8.0), ('H5_A5', 5, 1, 5, 'AVAILABLE', 8.0),
('H5_B1', 5, 2, 1, 'AVAILABLE', 8.0), ('H5_B2', 5, 2, 2, 'AVAILABLE', 8.0), ('H5_B3', 5, 2, 3, 'AVAILABLE', 8.5), ('H5_B4', 5, 2, 4, 'AVAILABLE', 8.0), ('H5_B5', 5, 2, 5, 'AVAILABLE', 8.0),
('H5_C1', 5, 3, 1, 'AVAILABLE', 8.0), ('H5_C2', 5, 3, 2, 'AVAILABLE', 8.0), ('H5_C3', 5, 3, 3, 'AVAILABLE', 8.5), ('H5_C4', 5, 3, 4, 'AVAILABLE', 8.0), ('H5_C5', 5, 3, 5, 'AVAILABLE', 8.0),
('H5_D1', 5, 4, 1, 'AVAILABLE', 7.5), ('H5_D2', 5, 4, 2, 'AVAILABLE', 7.5), ('H5_D3', 5, 4, 3, 'AVAILABLE', 8.5), ('H5_D4', 5, 4, 4, 'AVAILABLE', 7.5), ('H5_D5', 5, 4, 5, 'AVAILABLE', 7.5),
('H5_E1', 5, 5, 1, 'AVAILABLE', 7.5), ('H5_E2', 5, 5, 2, 'AVAILABLE', 7.5), ('H5_E3', 5, 5, 3, 'AVAILABLE', 8.5), ('H5_E4', 5, 5, 4, 'AVAILABLE', 7.5), ('H5_E5', 5, 5, 5, 'AVAILABLE', 7.5),
('H5_F1', 5, 6, 1, 'AVAILABLE', 7.5), ('H5_F2', 5, 6, 2, 'AVAILABLE', 7.5), ('H5_F3', 5, 6, 3, 'AVAILABLE', 8.5), ('H5_F4', 5, 6, 4, 'AVAILABLE', 7.5), ('H5_F5', 5, 6, 5, 'AVAILABLE', 7.5),
('H5_G1', 5, 7, 1, 'AVAILABLE', 7.0), ('H5_G2', 5, 7, 2, 'AVAILABLE', 7.0), ('H5_G3', 5, 7, 3, 'AVAILABLE', 8.5), ('H5_G4', 5, 7, 4, 'AVAILABLE', 7.0), ('H5_G5', 5, 7, 5, 'AVAILABLE', 7.0),
('H5_H1', 5, 8, 1, 'AVAILABLE', 7.0), ('H5_H2', 5, 8, 2, 'AVAILABLE', 7.0), ('H5_H3', 5, 8, 3, 'AVAILABLE', 8.5), ('H5_H4', 5, 8, 4, 'AVAILABLE', 7.0), ('H5_H5', 5, 8, 5, 'AVAILABLE', 7.0),
('H5_I1', 5, 9, 1, 'AVAILABLE', 7.0), ('H5_I2', 5, 9, 2, 'AVAILABLE', 7.0), ('H5_I3', 5, 9, 3, 'AVAILABLE', 8.5), ('H5_I4', 5, 9, 4, 'AVAILABLE', 7.0), ('H5_I5', 5, 9, 5, 'AVAILABLE', 7.0);

INSERT INTO seat (seat_id, hall_id, row_num, column_num, status, overall_score) VALUES
('H6_A1', 6, 1, 1, 'AVAILABLE', 8.0), ('H6_A2', 6, 1, 2, 'AVAILABLE', 8.0), ('H6_A3', 6, 1, 3, 'AVAILABLE', 8.5), ('H6_A4', 6, 1, 4, 'AVAILABLE', 8.0), ('H6_A5', 6, 1, 5, 'AVAILABLE', 8.0),
('H6_B1', 6, 2, 1, 'AVAILABLE', 8.0), ('H6_B2', 6, 2, 2, 'AVAILABLE', 8.0), ('H6_B3', 6, 2, 3, 'AVAILABLE', 8.5), ('H6_B4', 6, 2, 4, 'AVAILABLE', 8.0), ('H6_B5', 6, 2, 5, 'AVAILABLE', 8.0),
('H6_C1', 6, 3, 1, 'AVAILABLE', 8.0), ('H6_C2', 6, 3, 2, 'AVAILABLE', 8.0), ('H6_C3', 6, 3, 3, 'AVAILABLE', 8.5), ('H6_C4', 6, 3, 4, 'AVAILABLE', 8.0), ('H6_C5', 6, 3, 5, 'AVAILABLE', 8.0),
('H6_D1', 6, 4, 1, 'AVAILABLE', 7.5), ('H6_D2', 6, 4, 2, 'AVAILABLE', 7.5), ('H6_D3', 6, 4, 3, 'AVAILABLE', 8.5), ('H6_D4', 6, 4, 4, 'AVAILABLE', 7.5), ('H6_D5', 6, 4, 5, 'AVAILABLE', 7.5),
('H6_E1', 6, 5, 1, 'AVAILABLE', 7.5), ('H6_E2', 6, 5, 2, 'AVAILABLE', 7.5), ('H6_E3', 6, 5, 3, 'AVAILABLE', 8.5), ('H6_E4', 6, 5, 4, 'AVAILABLE', 7.5), ('H6_E5', 6, 5, 5, 'AVAILABLE', 7.5),
('H6_F1', 6, 6, 1, 'AVAILABLE', 7.5), ('H6_F2', 6, 6, 2, 'AVAILABLE', 7.5), ('H6_F3', 6, 6, 3, 'AVAILABLE', 8.5), ('H6_F4', 6, 6, 4, 'AVAILABLE', 7.5), ('H6_F5', 6, 6, 5, 'AVAILABLE', 7.5),
('H6_G1', 6, 7, 1, 'AVAILABLE', 7.0), ('H6_G2', 6, 7, 2, 'AVAILABLE', 7.0), ('H6_G3', 6, 7, 3, 'AVAILABLE', 8.5), ('H6_G4', 6, 7, 4, 'AVAILABLE', 7.0), ('H6_G5', 6, 7, 5, 'AVAILABLE', 7.0),
('H6_H1', 6, 8, 1, 'AVAILABLE', 7.0), ('H6_H2', 6, 8, 2, 'AVAILABLE', 7.0), ('H6_H3', 6, 8, 3, 'AVAILABLE', 8.5), ('H6_H4', 6, 8, 4, 'AVAILABLE', 7.0), ('H6_H5', 6, 8, 5, 'AVAILABLE', 7.0),
('H6_I1', 6, 9, 1, 'AVAILABLE', 7.0), ('H6_I2', 6, 9, 2, 'AVAILABLE', 7.0), ('H6_I3', 6, 9, 3, 'AVAILABLE', 8.5), ('H6_I4', 6, 9, 4, 'AVAILABLE', 7.0), ('H6_I5', 6, 9, 5, 'AVAILABLE', 7.0),
('H6_J1', 6, 10, 1, 'AVAILABLE', 7.0), ('H6_J2', 6, 10, 2, 'AVAILABLE', 7.0), ('H6_J3', 6, 10, 3, 'AVAILABLE', 8.5), ('H6_J4', 6, 10, 4, 'AVAILABLE', 7.0), ('H6_J5', 6, 10, 5, 'AVAILABLE', 7.0);

-- 正确插入 order_seat (seat_id, order_id)
INSERT INTO order_seat (seat_id, order_id) VALUES
('H1_A1', 1), ('H1_A2', 1),  -- 订单1订了 Hall1 的 A1, A2
('H2_A3', 2), ('H2_A4', 2),  -- 订单2订了 Hall2 的 A3, A4
('H1_B1', 3), ('H1_B2', 3),  -- 订单3订了 Hall1 的 B1, B2
('H3_A1', 4), ('H3_A2', 4),  -- 订单4订了 Hall3 的 A1, A2
('H3_B1', 5), ('H3_B2', 5),  -- 订单5订了 Hall3 的 B1, B2
('H3_C1', 6), ('H3_C2', 6);  -- 订单6订了 Hall3 的 C1, C2

-- 插入 Payment
INSERT INTO payment (order_id, payment_method, amount, payment_time, status) VALUES
(1, 'credit_card', 20.00, '2025-04-26 09:05:00', 'success'),
(2, 'paypal', 15.00, '2025-04-26 14:05:00', 'success'),
(3, 'applepay', 25.00, '2025-04-28 10:05:00', 'success'),
(4, 'credit_card', 18.00, '2025-04-28 13:05:00', 'success'),
(5, 'paypal', 20.00, '2025-04-29 08:05:00', 'success'),
(6, 'credit_card', 22.00, '2025-04-29 12:05:00', 'success');

-- 插入 Category
INSERT INTO category (name) VALUES
('Action'), ('Sci-Fi'), ('Animation'), ('Drama'), ('Adventure'), ('Fantasy');

-- 插入 MovieCategory
INSERT INTO moviecategory (movie_id, category_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 2), (5, 4), (6, 3), (7, 6);

-- 插入 Admin
INSERT INTO admin (username, password, email, role) VALUES
('admin1', 'adminpass1', 'admin1@example.com', 'super_admin'),
('admin2', 'adminpass2', 'admin2@example.com', 'admin');

INSERT INTO seat_experience_ratings (seat_id, rating) VALUES
('H1_A1', 5),
('H1_B2', 4),
('H2_A3', 5),
('H3_C1', 3);