const Card = ({ img, name, price, width, onClick }) => {
  return (
    <div>
      <section className="flex-wrap p-2 m-1 mx-2 border-2 cursor-pointer ">
        <div
          onClick={(e) => onClick(e)}
          className="flex flex-col items-center justify-center "
        >
          <div className="overflow-hidden">
            <div className="transition ease-in bg-contain hover:scale-110 ">
              <img className="z-20 h-56 " width={width} src={img} alt={img} />
            </div>
          </div>
          <main className="flex flex-col items-center justify-center capitalize cursor-pointer">
            <h2 className="mt-2">{name}</h2>
            <h1 className="font-bold">From {price}</h1>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Card;
