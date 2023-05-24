const Loader = () => {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className=" w-36 h-36 border-6 border-t-4 rounded-full animate-spin border-orangelight"></div>
      <p className=" text-primary my-3 text-base font-semibold">LOADING...</p>
    </div>
  );
};

export default Loader;
