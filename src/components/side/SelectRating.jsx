import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

function SelectRating({ onRatingChange }) {
  const totalStars = 5;

  const [maxRating, setMaxRating] = useState(0);

  const toggleRating = (isChecked, value) => {
    setMaxRating(isChecked ? value : 0);
    onRatingChange(isChecked ? value : 0);
  };

  return (
    <div className="mx-4 mt-6 mb-2">
      <h1 className="font-bold mb-4">Select Rating</h1>
      <div className="flex items-center gap-1.5 relative">
        {Array.from({ length: totalStars }, (_, index) => (
          <label
            key={index}
            className="cursor-pointer rounded-md p-2 dark:hover:bg-gray-800"
            htmlFor={`rating-${index}`}
          >
            <input
              id={`rating-${index}`}
              type="checkbox"
              onChange={(e) => toggleRating(e.target.checked, index + 1)}
              checked={maxRating === index + 1}
              className="appearance-none w-0 h-0 opacity-0 pointer-events-none absolute"
            />
            {maxRating >= index + 1 ? (
              <StarFilledIcon className="w-8 h-8 text-yellow-500" />
            ) : (
              <StarIcon className="w-8 h-8" />
            )}
            <span className="sr-only">{index + 1}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectRating;
