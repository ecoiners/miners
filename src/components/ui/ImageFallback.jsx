import { useState } from "react";

function ImageWithFallback({ url, name }) {
  const [imgError, setImgError] = useState(false);

  function getRandomColor() {
    // Generate a random number between 1 and 5
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    // Map the random number to a specific color
    let color;
    switch (randomNumber) {
      case 1:
        color = '#ACC8E5';
        break;
      case 2:
        color = '#9AF086';
        break;
      case 3:
        color = '#F0D086';
        break;
      case 4:
        color = '#F3A0A0';
        break;
      case 5:
        color = '#B2AEF4';
        break;
      default:
        color = '#FFFFFF'; // fallback color (white)
    }

    // Return the selected color
    return color;
  }

  // Example usage:
  const randomColor = getRandomColor();

  return (
    <div className="relative w-full h-full">
      {!imgError ? (
        <img
          src={url}
          alt={name}
          onError={() => setImgError(true)}
          className="rounded-full object-cover w-full h-full"
          style={{ display: imgError ? 'none' : 'block' }}
        />
      ) : (
        <div
          className="w-full h-full flex justify-center items-center text-black rounded-full"
          style={{
            backgroundColor: randomColor,
            backdropFilter: 'blur(3xl)',
            backgroundOpacity: 0.1,
          }}
        >
          <p className="font-roboto font-black capitalize text-3xl">
            {name?.slice(0, 1)}
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageWithFallback;
