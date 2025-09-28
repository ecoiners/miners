import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStartTime } from '../../rtk/slice/UserInfoSlice';

const ClickableDiv = () => {
  const dispatch = useDispatch();
  const gameStartTime = useSelector((state) => state.UserInfo.gameStartTime);

  const [countdown, setCountdown] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalId);
      const currentTime = new Date().toISOString();
      dispatch(setGameStartTime(currentTime));
    }
  }, [countdown, dispatch, intervalId]);

  const handleButtonClick = () => {
    const currentTime = new Date();
    if (gameStartTime) {
      const lastClickTime = new Date(gameStartTime);
      const timeDiff = currentTime - lastClickTime;

      if (timeDiff < 24 * 60 * 60 * 1000) { // 1 day in milliseconds
        alert("You can only start a new countdown after 24 hours!");
        return;
      }
    }

    if (!intervalId) {
      setCountdown(30); // Start a 30-second countdown
      const id = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  return (
    <div>
      <div
        className="w-80 h-80 p-4 rounded-full circle-outer cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="w-full h-full rounded-full circle-inner">
          <img src="mainChar.png" alt="Main Character" className="w-full h-full" />
        </div>
      </div>
      <p>{countdown !== null ? `Time left: ${countdown} seconds` : "Click to start the countdown!"}</p>
    </div>
  );
};

export default ClickableDiv;
