import { useState } from 'react';
import '../App.css';
import Sft_icon from "../assets/icons/SFTChainLogo.png";
import { useSelector } from 'react-redux';
import { useClaimAblePointForTappingQuery, useFindAccountQuery, usePointTableQuery, useRequestForClaimMutation, useSingleTappingGameMutation, useUpdateLastPlayedGameTimeMutation } from '../rtk/api/Endpoint';
import Spline from '@splinetool/react-spline';

const Game = () => {
  const userId = useSelector((state => state.UserInfo?.userId));
  const { data } = useFindAccountQuery(userId);

  const _id = useSelector((state => state?.UserInfo?._id));
  const { data: PointData } = usePointTableQuery(_id);
  const { data: ClaimAblePoint } = useClaimAblePointForTappingQuery(_id);
  const [triggerClaim] = useRequestForClaimMutation();

  const [triggerTap] = useSingleTappingGameMutation();
  const TapObject = {
    point_table: PointData?._id,
    user_id: _id,
    status: "unclaim"
  }

  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [TimeLimit, setTimeLimit] = useState(false);
  const pointsToAdd = .33;


  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const [triggerUpdateLastPlayedTime] = useUpdateLastPlayedGameTimeMutation();
  const gameStartTime = data?.lastGamePlayed ? data?.lastGamePlayed : 0;

  const date = new Date(gameStartTime);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, make it 12
  const formattedHours = hours.toString().padStart(2, "0");

  const handleCardClick = (e) => {
    const currentTime = new Date();
    if (gameStartTime) {
      const lastClickTime = new Date(gameStartTime);
      const timeDiff = currentTime - lastClickTime;

      if (timeDiff < 24 * 60 * 60 * 1000) {
        setTimeLimit(true);
        triggerClaim(_id);
        return;
      }
    }

    if (points <= 30) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
      setTimeout(() => {
        card.style.transform = '';
      }, 100);

      setPoints(points + pointsToAdd);
      triggerTap(TapObject);
    } else {
      const currentTime = new Date().toISOString();
      const playedOBJ = {
        id: _id,
        lastGamePlayed: currentTime
      }
      triggerUpdateLastPlayedTime(playedOBJ);
    }
  };

  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touches, setTouches] = useState([]);
  const handleTouchStart = (e) => {
    setTouchStartTime(Date.now());
    setTouches(e.touches);
  };

  const handleTouchEnd = (e) => {
    const touchDuration = Date.now() - touchStartTime;
    const numberOfTouches = touches.length;

    if (touchDuration < 300 && numberOfTouches > 1) {
      handleCardClick(e);
      setClicks([...clicks, { id: Date.now(), numberOfTouches, x: e.pageX, y: e.pageY }]);
    } else if (numberOfTouches === 1) {
      handleCardClick(e);
      setClicks([...clicks, { id: Date.now(), numberOfTouches, x: e.pageX, y: e.pageY }]);
    }
  };

  return (
    <div className="bg-black flex justify-center">
      <p className="font-roboto text-xs capitalize text-center absolute top-2 left-[50%] -translate-x-[50%] text-transparent bg-gradient-to-r from-[#27C9FF] to-[#FBD130] bg-clip-text">game</p>

      <div className="w-full bg-black text-white min-h-[90vh] font-bold flex flex-col max-w-xl mt-5">


        <div className="flex-grow mt-4  relative z-0 pt-10 flex  items-center flex-col">

          <div className="px-4 mt-4 flex justify-center">
            <div
              className="w-80 h-80 p-4 rounded-full relative"
              // onClick={handleCardClick}
              onTouchStart={handleTouchStart} // Start tracking touches
              onTouchEnd={handleTouchEnd} // End of touch and trigger based on conditions

            >
              <div className="w-full h-full rounded-full relative overflow-hidden z-10">
                <Spline scene="https://prod.spline.design/S3Jq4XjrceNeA8Zq/scene.splinecode" className='scale-[2]' />
              </div>
              <div className="bg-[#fbd230a2] w-64 h-64 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] blur-3xl rounded-full z-0 absolute"></div>
            </div>
            {
              clicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
                  style={{
                    top: `${click.y}px`,
                    left: `${click.x}px`,
                    animation: `float 2s ease-out`
                  }}
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                  {click?.numberOfTouches * 0.33}
                </div>
              ))
            }
          </div>

          <div className="w-[90%] h-14 bg-gradient-to-r from-[#27C9FF] to-[#FBD130] p-[1px] mt-20 mx-auto shadow-2xl absolute bottom-10 rounded-lg flex items-center justify-between">
            {
              TimeLimit ?
                <div className="bg-black w-full h-full rounded-lg flex justify-center items-center gap-3" >
                  <p className='text-xl text-white font-roboto'>Back again at {formattedHours}:{minutes} {ampm}</p>
                </div>
                :
                <div className="bg-black w-full h-full rounded-lg flex justify-center items-center gap-3" onClick={() => triggerClaim(_id)}>
                  <p className='text-xl text-white font-roboto'>Claim</p>
                  <div className="flex items-center gap-1">
                    <img src={Sft_icon} alt="Main Character" className="size-6" />
                    <p className="text-xl text-white">{ClaimAblePoint?.data?.Point ? Number(ClaimAblePoint?.data?.Point).toFixed(2) : 0}</p>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>

  );
};

export default Game;
