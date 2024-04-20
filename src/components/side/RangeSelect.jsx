import { Slider } from "@/components/ui/slider";
import { useState } from "react";

function RangeSelect({ onRadiusChange }) {
  const [radius, setRadius] = useState(2500);

  return (
    <div className="mt-5 px-2">
      <h2 className="font-bold">Select Radius (In Meter)</h2>
      <Slider
        defaultValue={radius}
        max={5000}
        step={500}
        onChange={(value) => {
          setRadius(value);
          onRadiusChange(value);
        }}
      />
      <label className="text-gray-500 text-[15px]">{radius} in Meter</label>
    </div>
  );
}

export default RangeSelect;
