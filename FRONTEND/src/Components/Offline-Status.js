import React from "react";
import Button from "./Button";

const OfflineStatus = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center gap-3">
          <img src="/image/emptyList.png" alt="" width={250} />
          <span className="text-3xl font-bold">
            You're Offine Please Go Back To Online
          </span>
          <div>
            <Button
              className="py-2 text-white bg-personal-500"
              onClick={() => window.location.reload}
            >
              Reload Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfflineStatus;
