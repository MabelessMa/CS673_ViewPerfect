import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

/**
 * BookButton 组件
 * @param {string} movieId - 要预订的电影 ID (跳转到 SeatSelectionPage 使用)
 * @returns {JSX.Element}
 */
const BookButton = ({ movieId }) => {
  return (
    <Button type="primary">
      <Link to={`/seats`}>Book Now</Link>
    </Button>
  );
};

export default BookButton;
