const Card = () => {
  return (
    <div className="mt-10">
      <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4 p-5">

      <div className="p-6 bg-[#edf4f9] rounded-md custom-div">
          <div className="custom-div-content p-5">
          <h1 className="text-3xl font-semibold mb-5 mt-5">Payment Solution</h1>
          <p className="text-[#666666] font-medium">
            Eget felis diam dictumst lorem eros parturient letius morbi metus
            id. Cras suscipit vulputate sollicitudin nullam maximus.
          </p>
          </div>
        </div>
        
        <div className="p-6 bg-[#edf4f9] rounded-xl hover-div">
          <div className="custom-div-content p-5">
          <h1 className="text-3xl font-semibold mb-5 mt-5">Growth Business</h1>
          <p className="text-[#666666] font-medium">
            Eget felis diam dictumst lorem eros parturient letius morbi metus
            id. Cras suscipit vulputate sollicitudin nullam maximus.
          </p>
          </div>
        </div>

        <div className="p-6 bg-[#edf4f9] rounded-xl hover-div">
          <div className="custom-div-content p-5">
          <h1 className="text-3xl font-semibold mb-5 mt-5">Connected People</h1>
          <p className="text-[#666666] font-medium">
            Eget felis diam dictumst lorem eros parturient letius morbi metus
            id. Cras suscipit vulputate sollicitudin nullam maximus.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
