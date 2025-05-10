'use client';


export const TierCard = () => {

  return (
    <div
    //   className="w-full h-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden"
    //   style={{ backgroundColor: tier.badgeColor }}
    >
      {/* <img
        src={`${tier.cardImageUrl}.svg`}
        alt={tier.titleEn}
        className="w-[80%] h-[80%] object-contain"
      /> */}
      <div className="absolute bottom-0 p-6 text-white flex flex-col items-center justify-center mb-10">
        {/* <div className="text-2xl font-bold">{tier.titleJa}</div>
        <div className="text-5xl font-bold">{tier.titleEn}</div> */}
      </div>
    </div>
  );
};
