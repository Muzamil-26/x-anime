import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ShareGif from "../assets/Images/icegif-367.gif";
import { MdShare } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface Episodes {
    eps: number | null;
    sub: number | null;
    dub: number | null;
}

interface AnimeInfo {
    id: string;
    mal_id: number;
    anime_id: number;
    al_id: number;
    name: string;
    img: string;
    rating: string;
    episodes: Episodes;
    category: string;
    quality: string;
    duration: string;
    description: string;
}

interface MoreInfo {
    "Japanese:": string;
    "Synonyms:": string;
    "Aired:": string;
    "Premiered:": string;
    "Duration:": string;
    "Status:": string;
    "MAL Score:": string;
    "Studios:": string;
    Genres: string[];
    Producers: string[];
  }

interface Anime {
    id: string;
    name: string;
    category: string;
    img: string;
    episodes: Episodes;
}


interface SpecificAnime {
    info: AnimeInfo;
    moreInfo: MoreInfo;
    relatedAnimes: Anime[];
    recommendedAnimes: Anime[];
    mostPopularAnimes: Anime[];
    
}

const AnimeDetails = ({ specific, firstEpisode }: { specific: SpecificAnime; firstEpisode: string | null })=>{
    const [showShare, setShowShare] = useState(false);

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen  rounded-3xl text-white p-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
                <div className="relative w-60">
                    <img src={specific?.info.img} alt={specific?.info.name} className="rounded-lg" />
                    <div className="absolute top-0 w-full bg-black bg-opacity-60 text-center py-2 rounded-b-lg">
                        Watch2gether
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{specific?.info.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gray-700 px-2 py-1 rounded">{specific?.info.quality}</span>
                        <span className="bg-gray-500 px-2 py-1 rounded">{specific?.info.category}</span>
                        <span className="bg-gray-500 px-2 py-1 rounded">{specific?.info.duration}</span>
                    </div>

                    <NavLink to={`/watch2/${firstEpisode}`}>
                    <button className="mt-4 flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
                        <FaPlay /> Watch Now
                    </button>
                    </NavLink>
                    {/* <button className="ml-4 mt-4 flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full">
                        <FaPlus /> Add to List
                    </button> */}

                    <p className="mt-4 text-gray-300">{specific?.info.description.length>50? specific?.info.description.substring(0, 600) + "..." : specific?.info.description}</p>

                    <div className="mt-6 flex items-center gap-4">
                        <img src={ShareGif} alt="User" className="w-10 h-10 rounded-full" />
                        <span>Share Anime to your friends</span>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => setShowShare(!showShare)}
                            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full"
                        >
                            <MdShare /> Share
                        </button>
                        <div className="sharethis-inline-share-buttons"></div>
                    </div>
                </div>

                <div className="md:w-1/3 bg-gray-800 p-4 rounded-lg">
                    <p><strong>Japanese:</strong> {specific?.moreInfo["Japanese:"]}</p>
                    <p><strong>Synonyms:</strong> {specific?.moreInfo["Synonyms:"]}</p> 
                    <p><strong>Aired:</strong> {specific?.moreInfo["Aired:"]}</p>
                    <p><strong>Premiered:</strong> {specific?.moreInfo["Premiered:"]}</p>
                    <p><strong>Duration:</strong> {specific?.moreInfo["Duration:"]}</p>
                    <p><strong>Status:</strong> {specific?.moreInfo["Status:"]}</p>
                    <p><strong>MAL Score:</strong> {specific?.moreInfo["MAL Score:"]}</p>
                    <p className="w-full"><strong>Genres:</strong> {specific?.moreInfo.Genres.join(", ")}</p>
                    <p><strong>Studios:</strong> {specific?.moreInfo["Studios:"]}</p>
                    <p><strong>Producers:</strong> {specific?.moreInfo.Producers.join(", ")}</p>

                </div>
            </div>
        </div>
    );
};

export default AnimeDetails;