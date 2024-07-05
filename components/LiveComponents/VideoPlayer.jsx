import React, { memo, useEffect, useRef } from "react";

const VideoPlayer = memo(({ user, UID, users }) => {
  const ref = useRef();
  const videoHolder = document.getElementById("userVideo");

  useEffect(() => {
    if (user.videoTrack) {
      console.log("Playing video track for user:", user.uid);
      user.videoTrack.play(ref.current);
    }
    if (user.audioTrack && user.uid !== UID) {
      console.log("Playing audio track for user:", user.uid);
      user.audioTrack.play();
    }
    if (user.screenShareTrack) {
      console.log("Playing screen share track for user:", user.uid);
      user.screenShareTrack.play(ref.current);
      if (user.uid !== UID) {
        user.audioTrack.play();
      }
    }
  }, [user, UID]);

  const enLargeFrame = (event) => {
    const videoHolder = document.getElementById("userVideo");
    const shareScreen = document.getElementById("share-screen");

    if (event.target.parentNode.parentNode.parentNode.id !== shareScreen.id) {
      let child = shareScreen.children[0];
      if (child) {
        videoHolder.appendChild(child);
      }
      shareScreen.classList.remove("hidden");
      shareScreen.appendChild(event.currentTarget);
    } else {
      videoHolder.appendChild(
        document.getElementById("share-screen").children[0]
      );
      shareScreen.classList.add("hidden");
    }
  };

  if (!user.videoTrack && !user.screenShareTrack) {
    return null;
  }

  return (
    <>
      <div
        ref={ref}
        id={user.uid}
        onClick={enLargeFrame}
        className="w-[300px] h-[300px] overflow-hidden cursor-pointer rounded-3xl mr-3 border-2 m-auto border-gray-300 md:w-[170px] md:h-[170px] xl:w-[250px] xl:h-[250px] videoPlayer"
      ></div>
    </>
  );
});

export default VideoPlayer;
