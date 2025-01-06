import CardGridConfig from "../componnets/CardGridConfig";


const CardGrid = () => {
  return (
    <div className="min-h-screen">
      <CardGridConfig 
        containerWidth="90vw"     // 或使用具體像素值，如 "1200px"
        containerHeight="80vh"    // 或使用具體像素值，如 "800px"
      />
    </div>
  );
};

export default CardGrid;