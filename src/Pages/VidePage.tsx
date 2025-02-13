import React, { useEffect, useState } from "react";
import {  Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllContext } from "@/context/AllContext";
import axios from "axios";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
// import VideoPlayer from "@/components/ShakaPlayer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import VideoPlayer2 from "@/components/ShalaPlayer2";
import { useLocation } from "react-router-dom";
import { MdShare } from "react-icons/md";
import ShareGif from '../assets/Images/icegif-367.gif';
import AnimeCard from "../components/AnimeCard";

  interface Server {
    sub?: Array<{ serverId: number; serverName: string }>;
    dub?: Array<{ serverId: number; serverName: string }>;
  }

const AnimeWatchPage: React.FC = () => {
  const { animeData, episode, setEpisodes, setAnimeData } =
    useAllContext();
  const { epid } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep"); // Get query param "?ep=..."
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [tracks, setracks] = useState<
    { file: string; kind: string; label: string; srclang: string }[]
  >([]);
  const [server, setServer] = useState<Server|null>(null);
  const [, setLoading] = useState(true);
  const [recommendedAnimes, setrecommendedAnimes] = useState<any[]>([]);
  const location = useLocation();




  useEffect(() => {
    if (epid && ep) fetchVideoUrl();
    setVideoURL(null);
    setracks([]);
  }, [epid, ep]);

  const fetchVideoUrl = async () => {
    try {
      setLoading(true); // Start loading
      const serveerResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/aniwatch/servers?id=${epid}?ep=${ep}`
      );

      console.log("serverResponse", serveerResponse.data);
      setServer(serveerResponse.data);

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/episode-srcs?id=${epid}?ep=${ep}`
      );

      // console.log("Video Server Response:", response.data);

      const fetchedURL = response.data.sources?.[0]?.url || null;
      setVideoURL(fetchedURL);
      setracks(response.data?.tracks);

      console.log("tracksss", response);

      const response3 = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/aniwatch/episodes/${epid}`
      );

      setEpisodes(response3.data.episodes);

      const response4 = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/aniwatch/anime/${epid}`
      );

      setAnimeData(response4.data);
      setrecommendedAnimes(response4?.data?.recommendedAnimes || []);

      console.log("Video URL:", response4.data);
    } catch (error) {
      console.error("Error fetching video URL:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // console.log("Tracks:", videoURL, tracks);
  // console.log("Tracks Type:", typeof tracks);
  console.log("Server Sub:", server?.sub);


  return (
    // <>
    //   <div className="flex flex-col md:flex-row min-h-screen rounded-3xl mt-5 bg-gray-900 text-white" >
    //     <ScrollArea className="h-[60vh] w-full md:w-1/4 p-4 border-r border-gray-700">
    //       <div className="p-4">
    //         <h2 className="text-lg font-semibold mb-2">List of episodes:</h2>
    //         {episode.map((ep: any, index: number) => (
    //           <div
    //             key={index}
    //             className={`w-full h-full flex flex-col justify-center items-center cursor-pointer`}
    //           >
    //             <NavLink
    //               to={`/watch2/${ep.episodeId}`}
    //               className={`p-2 rounded cursor-pointer w-full ${location.pathname.split("/")[2] + location.search ===
    //                 ep.episodeId
    //                 ? "bg-gray-500"
    //                 : "hover:bg-gray-800"
    //                 }`}
    //             >
    //               {index + 1}. {ep.name}
    //             </NavLink>
    //             <Separator className="my-2" />
    //           </div>
    //         ))}
    //       </div>
    //     </ScrollArea>

    //     {/* Main Content */}
    //     <main className="flex-1 p-4">
    //       <div className="relative bg-black aspect-video flex items-center justify-center">
    //         {videoURL ? (
    //           <VideoPlayer2
    //             key={`${epid}-${ep}`}
    //             src={videoURL}
    //             captions={tracks}
    //           />
    //         ) : (
    //           <p className="text-white">Loading...</p>
    //         )}



    //       </div>
    //       <div className="mt-4 flex items-center justify-between text-sm">
    //         <span>
    //           SUB:
    //           {server?.sub?.map((item: any, index: any) => (
    //             <Button
    //               variant="outline"
    //               className="bg-black hover:bg-gray-800 hover:text-white"
    //               key={index}
    //             >
    //               {item.serverName.toUpperCase()}
    //             </Button>
    //           ))}
    //         </span>
    //         <span>
    //           DUB:
    //           {server?.dub?.map((item: any, index: any) => (
    //             <Button
    //               variant="outline"
    //               className="bg-black hover:bg-gray-800 hover:text-white"
    //               key={index}
    //             >
    //               {item.serverName.toUpperCase()}
    //             </Button>
    //           ))}
    //         </span>
    //       </div>
    //       <p className="mt-2 bg-yellow-500 p-2 text-black text-sm">
    //         If the current server doesn't work, please try other servers beside.
    //       </p>

    //       <div className="mt-6 flex items-center gap-4">
    //         <img src={ShareGif} alt="User" className="w-10 h-10 rounded-full" />
    //         <span>Share Anime to your friends</span>
    //       </div>

    //       <div className="mt-4 flex gap-3">
    //         <button
    //           className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full"
    //         >
    //           <MdShare /> Share
    //         </button>
    //         <div className="sharethis-inline-share-buttons"></div>
    //       </div>

    //     </main>

    //     {/* Sidebar Right */}
    //     <aside className="w-full md:w-1/4 p-4 border-l border-gray-700">
    //       <img
    //         src={animeData?.info?.img}
    //         alt={animeData?.info?.name || "Anime Image"}
    //         className="w-full h-40 object-cover rounded-lg mb-4"
    //       />
    //       <h2 className="text-xl font-semibold">
    //         {animeData?.info?.name || "Loading..."}
    //       </h2>
    //       <p className="text-sm text-gray-400">
    //         {animeData?.info?.description.length > 50
    //           ? animeData?.info?.description.substring(0, 600) + "..."
    //           : animeData?.info?.description}
    //       </p>
    //       <div className="flex items-center gap-2 mt-2">
    //         <span className="bg-yellow-400 px-2 py-1 text-black text-xs">
    //           {animeData?.moreInfo?.["MAL Score:"] ?? "N/A"}
    //         </span>
    //         <Star size={20} className="text-yellow-400" />
    //       </div>
    //       <h3 className="mt-4 text-lg">What do you think?</h3>
    //       <div className="flex gap-2 mt-2">
    //         <Button
    //           variant="outline"
    //           className="bg-black hover:bg-gray-800 hover:text-white"
    //         >
    //           Boring
    //         </Button>
    //         <Button
    //           variant="outline"
    //           className="bg-black hover:bg-gray-800 hover:text-white"
    //         >
    //           Great
    //         </Button>
    //         <Button
    //           variant="outline"
    //           className="bg-black hover:bg-gray-800 hover:text-white"
    //         >
    //           Amazing
    //         </Button>
    //       </div>
    //     </aside>

    //   </div>


    //   <div className="my-24">
    //     <h1 className="text-2xl text-[#A52010] mb-3 font-[Brutefont]">{"Recommend For You"}</h1>
    //     {recommendedAnimes?.length as any > 0 && (
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    //         <AnimeCard Alldata={recommendedAnimes} />
    //       </div>
    //     )}
    //   </div>
    // </>
<>
  <div className="flex flex-col md:flex-row min-h-screen rounded-3xl mt-5 bg-gray-900 text-white">
    {/* Left Sidebar (Episodes List) - Hidden on Mobile */}
    <ScrollArea className="hidden md:block h-[60vh] w-full md:w-1/4 p-4 border-r border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">List of episodes:</h2>
        {episode.map((ep: any, index: number) => (
          <div
            key={index}
            className={`w-full h-full flex flex-col justify-center items-center cursor-pointer`}
          >
            <NavLink
              to={`/watch2/${ep.episodeId}`}
              className={`p-2 rounded cursor-pointer w-full ${
                location.pathname.split("/")[2] + location.search ===
                ep.episodeId
                  ? "bg-gray-500"
                  : "hover:bg-gray-800"
              }`}
            >
              {index + 1}. {ep.name}
            </NavLink>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>

    {/* Main Content (Video Player) */}
    <main className="flex-1 p-4 order-1 md:order-2">
      <div className="relative bg-black aspect-video flex items-center justify-center">
        {videoURL ? (
          <VideoPlayer2
            key={`${epid}-${ep}`}
            src={videoURL}
            captions={tracks}
          />
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>

      {/* Server Buttons */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>
          SUB:
          {server?.sub?.map((item: any, index: any) => (
            <Button
              variant="outline"
              className="bg-black hover:bg-gray-800 hover:text-white"
              key={index}
            >
              {item.serverName.toUpperCase()}
            </Button>
          ))}
        </span>
        <span>
          DUB:
          {server?.dub?.map((item: any, index: any) => (
            <Button
              variant="outline"
              className="bg-black hover:bg-gray-800 hover:text-white"
              key={index}
            >
              {item.serverName.toUpperCase()}
            </Button>
          ))}
        </span>
      </div>

      {/* Additional Content */}
      <p className="mt-2 bg-yellow-500 p-2 text-black text-sm">
        If the current server doesn't work, please try other servers beside.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <img src={ShareGif} alt="User" className="w-10 h-10 rounded-full" />
        <span>Share Anime to your friends</span>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full">
          <MdShare /> Share
        </button>
        <div className="sharethis-inline-share-buttons"></div>
      </div>
    </main>

    {/* Right Sidebar (Anime Info) */}
    <aside className="w-full md:w-1/4 p-4 border-l border-gray-700 order-3">
      <img
        src={animeData?.info?.img}
        alt={animeData?.info?.name || "Anime Image"}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold">
        {animeData?.info?.name || "Loading..."}
      </h2>
      <p className="text-sm text-gray-400">
        {animeData?.info?.description.length > 50
          ? animeData?.info?.description.substring(0, 600) + "..."
          : animeData?.info?.description}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-yellow-400 px-2 py-1 text-black text-xs">
          {animeData?.moreInfo?.["MAL Score:"] ?? "N/A"}
        </span>
        <Star size={20} className="text-yellow-400" />
      </div>
      <h3 className="mt-4 text-lg">What do you think?</h3>
      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          className="bg-black hover:bg-gray-800 hover:text-white"
        >
          Boring
        </Button>
        <Button
          variant="outline"
          className="bg-black hover:bg-gray-800 hover:text-white"
        >
          Great
        </Button>
        <Button
          variant="outline"
          className="bg-black hover:bg-gray-800 hover:text-white"
        >
          Amazing
        </Button>
      </div>
    </aside>

    {/* Episodes List (Mobile Only) */}
    <ScrollArea className="block md:hidden h-[60vh] w-full p-4 border-t border-gray-700 order-2">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">List of episodes:</h2>
        {episode.map((ep: any, index: number) => (
          <div
            key={index}
            className={`w-full h-full flex flex-col justify-center items-center cursor-pointer`}
          >
            <NavLink
              to={`/watch2/${ep.episodeId}`}
              className={`p-2 rounded cursor-pointer w-full ${
                location.pathname.split("/")[2] + location.search ===
                ep.episodeId
                  ? "bg-gray-500"
                  : "hover:bg-gray-800"
              }`}
            >
              {index + 1}. {ep.name}
            </NavLink>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>

  {/* Recommended Animes */}
  <div className="my-24">
    <h1 className="text-2xl text-[#A52010] mb-3 font-[Brutefont]">
      {"Recommend For You"}
    </h1>
    {recommendedAnimes?.length as any > 0 && (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <AnimeCard Alldata={recommendedAnimes} />
      </div>
    )}
  </div>
</>
  );
};

export default AnimeWatchPage;
