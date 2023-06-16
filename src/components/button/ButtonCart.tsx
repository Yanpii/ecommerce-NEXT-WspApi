

const ButtonCart = () => {
  const handleClick = () => {
    const table = document.getElementById("tableCart");

    if (table) {
      table.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundImage:
            "url(https://cdn-icons-png.flaticon.com/512/7646/7646966.png)",
        }}
        className=" bg-[#6eec7a] border-solid border-4 border-white  fixed bottom-4 right-4 z-50 px-4 py-2 bg-cover bg-center rounded-full  text-white  w-16 h-16 font-bold hover:bg-sky-100 transition-colors transform transition-transform hover:scale-110"
      ></button>
    </div>
  );
};

export default ButtonCart;
