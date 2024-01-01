import React, { useState } from "react";
import { CONTROLS_DESCRIPTION } from "./commons";

const Controls = () => {
  const [showControls, setShowControls] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <div
      className={`h-1/3 md:w-1/4 bottom-0 select-none flex items-end space-x-4 absolute bottom-0 mb-4 ml-10 transition duration-300 ${
        !showControls ? "-translate-x-full" : ""
      }`}
    >
      <div className="text-white h-full w-full bottom-0">
        <h1 className="text-white md:text-xl font-bold w-full">
          CUBE CONTROLS
        </h1>

        <div className="flex items-end space-x-2 mt-4 justify-center">
          {/* KEYBOARD */}
          <div className="flex flex-col items-center mt-6">
            <button 
            onPointerEnter={() => setDescription(CONTROLS_DESCRIPTION.w)}
            onPointerLeave={() => setDescription('')}
            className="border border-white text-white p-2 lg:w-12 w-1/3 hover:scale-90 hover:bg-white hover:text-black mb-2">
              W
            </button>
            <div className="flex space-x-2">
              <button 
              onPointerEnter={() => setDescription(CONTROLS_DESCRIPTION.a)}
              onPointerLeave={() => setDescription('')}
              className="border border-white text-white p-2 lg:w-12 w-1/3 hover:scale-90 hover:bg-white hover:text-black">
                A
              </button>
              <button 
              onPointerEnter={() => setDescription(CONTROLS_DESCRIPTION.s)}
              onPointerLeave={() => setDescription('')}
              className="border border-white text-white p-2 lg:w-12 w-1/3 hover:scale-90 hover:bg-white hover:text-black">
                S
              </button>
              <button 
              onPointerEnter={() => setDescription(CONTROLS_DESCRIPTION.d)}
              onPointerLeave={() => setDescription('')}
              className="border border-white text-white p-2 lg:w-12 w-1/3 hover:scale-90 hover:bg-white hover:text-black">
                D
              </button>
            </div>
          </div>

          {/* MOUSE */}
          <button
            onPointerEnter={() => setDescription(CONTROLS_DESCRIPTION.mouse)}
            onPointerLeave={() => setDescription('')}
            className="lg:w-12 w-1/3 hover:scale-90 hover:bg-white bottom-0"
          >
            <img
              className="hover:invert hover:drop-shadow-lg p-2 border border-white"
              src="./images/mouse.png"
              alt=""
            />
          </button>
        </div>

        <p className="text-white mt-4 w-full">{description}</p>
      </div>
      {/* CONTROLS ICON */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="lg:w-10 lg:h-10 hover:scale-90 right-0 bottom-0 mb-4"
      >
        <img src="./images/controls.png" />
      </button>
    </div>
  );
};

export default Controls;
