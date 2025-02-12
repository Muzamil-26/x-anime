import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Episode Interface
interface Episode {
  eps: number|string;
  sub: number;
  dub: number;
}

// Data Interface for Each Anime Entry
interface AnimeData {
  id: string;
  name: string;
  rank: number;
  img: string;
  episodes: Episode;
}

interface Top10AnimesProps {
    top10Animes: {
      day: AnimeData[];
      week: AnimeData[];
      month: AnimeData[];
    }
  }

const Top10Animes: React.FC<Top10AnimesProps> = ({ top10Animes }) => {

console.log(top10Animes)


  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month">("day");

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md w-full">
      {/* Title */}
      <h2 className="text-white text-lg font-bold font-[BruteFont] mb-4">Top 10</h2>

      {/* Time Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["day", "week", "month"].map((period) => (
          <button
            key={period}
            className={`px-4 py-1 rounded-md font-semibold ${
              selectedPeriod === period ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
            onClick={() => setSelectedPeriod(period as "day" | "week" | "month")}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable List */}
      <div className="flex flex-col sm:flex-row gap-6 overflow-x-auto overflow-auto scrollbar-custom">
        {top10Animes[selectedPeriod]?.length > 0 ? (
          top10Animes[selectedPeriod].map((anime, index) => (
            <div
              key={anime.id}
              className="flex items-center  gap-3 bg-gray-900 p-3 rounded-lg min-w-[300px]"
            >
              {/* Rank */}
              <span className="text-yellow-400 font-bold text-lg">#{index + 1}</span>

              {/* Anime Image */}
              <NavLink to={`/watch/${anime.id}`} className="w-16 h-20 flex-shrink-0">
                <img
                  src={anime.img}
                  alt={anime.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </NavLink>

              {/* Anime Details */}
              <div>
                <h3 className="text-white text-sm font-semibold">
                  <NavLink to={`/watch/${anime.id}`} className="hover:text-yellow-500">
                  {anime?.name.length > 15 ? anime?.name.substring(0, 20) + "..." : anime?.name}
                  </NavLink>
                </h3>
                <div className="flex items-center text-xs text-gray-300 mt-1 gap-2">
                  {/* Subbed */}
                  <span className="flex items-center bg-green-500/20 text-green-400 px-2 py-1 rounded-md">
                    <i className="fas fa-closed-captioning mr-1"></i> {anime.episodes.sub}
                  </span>

                  {/* Dubbed */}
                  <span className="flex items-center bg-pink-500/20 text-pink-400 px-2 py-1 rounded-md">
                    <i className="fas fa-microphone mr-1"></i> {anime.episodes.dub}
                  </span>

                  {/* Episodes */}
                  <span className="bg-gray-700 px-2 py-1 rounded-md text-gray-300">
                    {anime.episodes.eps===null?"N/A":anime?.episodes.eps}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Top10Animes;
