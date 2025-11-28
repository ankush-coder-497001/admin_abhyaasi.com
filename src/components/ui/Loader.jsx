const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-20 ">
      <div className="relative flex items-center justify-center">
        {/* Outer Gradient Ring */}
        <div
          className="w-16 h-16 rounded-full animate-spin
                        bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] flex items-center justify-center"
        >
          <div className="w-10 h-10 bg-black rounded-full"></div>
        </div>

        {/* Soft Glow Dot */}
        <span className="absolute w-3 h-3 rounded-full bg-white animate-ping opacity-80"></span>
      </div>
    </div>
  );
};

export default Loader;
