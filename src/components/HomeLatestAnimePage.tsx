import React from "react";
import { NavLink } from "react-router-dom";

interface item {
    id: string;
    img: string;
    name: string;
}


interface MyComponentProps {
    lastestAnime: item[];
    head: string;
    link:string// Define the type as an array of strings
}


const TopAiring: React.FC<MyComponentProps> = ({ lastestAnime, head }) => {



    return (
        <div className="p-6 bg-[#181a1b] rounded-lg">
            <h2 className="text-white text-2xl font-semibold mb-4">{head}</h2>
            <div className="flex flex-col gap-6 ">
                {lastestAnime.map((anime, index) => (
                    <NavLink key={index} to={`/watch/${anime.id}`} className="block">
                        <li className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-t border-b-white border-b shadow-md w-full max-w-[400px]">
                            {/* Anime Thumbnail */}
                            <div className="w-14 h-14 flex-shrink-0">
                                <img
                                    src={anime.img}
                                    alt={anime.id}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Anime Details */}
                            <div className="flex-1">
                                <h3 className="text-white text-sm font-semibold">
                                    <div className="hover:text-red-500">{anime?.name.length > 15 ? anime?.name.substring(0, 20) + "..." : anime?.name}</div>
                                </h3>
                                <div className="flex items-center text-xs text-gray-300 mt-1 space-x-2">
                                    <span className="text-gray-400">• TV</span>
                                </div>
                            </div>
                        </li>


                    </NavLink>
                ))}
            </div>
            <div className="mt-4 text-right">
                <NavLink to={"/"} className="text-blue-400 hover:underline">View more →</NavLink>
            </div>
        </div>
    );
};

export default TopAiring;
