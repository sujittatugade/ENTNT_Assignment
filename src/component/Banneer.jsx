import React from "react";

export function Banneer() {
  return (
   <>
      <div
        className="h-[91vh] bg-cover bg-center relative..."
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/originals/29/7d/e0/297de0761b0c756266d74ca50d03cc1d.jpg)", }} >
              <div className=" bg-[blue] bg-opacity-5  text-white text-center w-full absolute inset-x-0 bottom-0 ">
                AVENGERS ENDGAME
              </div>
      </div>
      </>
  );
}
export default Banneer;
