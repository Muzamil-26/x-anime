import { NavLink } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Episodes {
  eps: number | null;
  sub: number | null;
  dub: number | null;
}

interface Item {
  id: string;
  img: string;
  name: string;
  desc?: string | null;
  category?: string | null;
  episodes: Episodes | null;
}

interface MyComponentProps {
  Alldata: Item[];
}



const Cards: React.FC<MyComponentProps> = ({ Alldata }) => {


  return (
    <>
      {Alldata.map((item, index) => (
        <HoverCard key={index}> {/* ✅ Key should be here using a unique ID */}
          <HoverCardTrigger asChild>
            <NavLink className="text-gray-700 cursor-pointer" to={`/watch/${item.id}`}>
              <div className="overflow-hidden">
                <img
                  className="hover:scale-110 transition ease-in-out object-cover w-[250px] lg:h-[300px]"
                  src={item.img}
                  alt={item.name}
                />
              </div>
              <div className="flex justify-between items-center h-20">
                <p className="pt-3 pb-1 text-lg font-bold">
                  {item.name.length > 15 ? item.name.substring(0, 20) + "..." : item.name}
                </p>
                <p className="text-yellow-400 font-bold text-lg">#{index + 1}</p>
              </div>
            </NavLink>
          </HoverCardTrigger>

          <HoverCardContent className="w-80 bg-[#000000e7]">
            <div className="w-full flex justify-between space-x-4">
              <div className="w-full space-y-1">
                <h4 className="font-semibold text-white text-xl">{item.name}</h4>
                {item.desc && <p className="text-sm">{item.desc}</p>}
                <div className="flex items-center pt-2 w-full">
                  <NavLink to={`/watch/${item.id}`} className="w-full">
                    <Button className="w-full bg-white hover:bg-white text-black">
                      <Play /> Watch
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </>
  );
};

export default Cards;
