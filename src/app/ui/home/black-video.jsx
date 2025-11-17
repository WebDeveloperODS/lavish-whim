'use client'; // Added it to use onClick function call

const BlackVideo = () => {
  return (
    <div className="relative my-10 lg:my-20 container rounded-xl shadow-md flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        onClick={() => window.location.href='/bags-by-lavish-whim'}
        className="w-full h-full max-h-[96vh] hidden lg:block object-cover rounded-xl cursor-pointer"
        src="/images/home/home-video-2.mp4"
        preload="auto"
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        onClick={() => window.location.href='/bags-by-lavish-whim'}
        className="w-full h-full max-h-screen object-cover block lg:hidden rounded-xl cursor-pointer"
        src="/images/home/home-video-2-mobile.mp4"
        preload="auto"
      />
    </div>
  );
};

export default BlackVideo;