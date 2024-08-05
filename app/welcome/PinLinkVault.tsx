
import React from "react";

const PinLinkVault = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Pin Link Vault, for easy access!
      </h1>
      <p className="text-white text-center mt-4">
        Click the icon in the top right corner to pin Link Vault
      </p>
      <center>
        <video
          style={{
            width: "405px",
            borderRadius: "10px",
            left: "50%",
            height: "284px",
          }}
          src="/linkvaultpin.mp4"
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          loop
          className="rounded-[10px] mt-4"
        />
      </center>
      <button className="text-blue-200 mt-2 text-xs" onClick={handleClick}>
        Done
      </button>
    </div>
  );
};

export default PinLinkVault;
