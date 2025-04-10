import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NavLink, useParams, useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import VideoPlayer2 from "@/components/ShalaPlayer2";
import VideoPlayer2 from "@/components/ShakaPlayer";
import { MdShare } from "react-icons/md";
import ShareGif from "../assets/Images/icegif-367.gif";
import AnimeCard from "../components/AnimeCard";
import '../css/LoaderForVideo.css';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"


const fetchVideoData = async (epid: string, ep: string, server: string, category: string) => {
  const serverRes = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/aniwatch/servers?id=${epid}?ep=${ep}`
  );
  const videoRes = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/aniwatch/episode-srcs?id=${epid}?ep=${ep}&server=${server || ""}&category=${category || ""}`
  );
  return {
    server: serverRes.data,
    videoURL: videoRes.data.sources?.[0]?.url || null,
    tracks: videoRes.data?.tracks || [],
  };
};

const fetchEpisodes = async (epid: string) => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/episodes/${epid}`);
  return res.data.episodes;
};

const fetchAnimeData = async (epid: string) => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/anime/${epid}`);
  return res.data;
};

const AnimeWatchPage: React.FC = () => {
  const { epid } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");
  const category = searchParams.get("category");
  const server = searchParams.get("server");
  const location = useLocation();

  const { data: videoData, isLoading } = useQuery({
    queryKey: ["videoData", epid, ep, server, category],
    queryFn: () => fetchVideoData(epid as string, ep as string, server as string, category as string),
    enabled: !!epid && !!ep,
  });

  const { data: episodes } = useQuery({
    queryKey: ["episodes", epid],
    queryFn: () => fetchEpisodes(epid as string),
    enabled: !!epid,

  });

  const { data: animeInfo } = useQuery({
    queryKey: ["animeData", epid],
    queryFn: () => fetchAnimeData(epid as string),
    enabled: !!epid,

  });


  return (
    <>
    <Toaster/>
      <div className="flex flex-col md:flex-row min-h-screen rounded-3xl mt-5 bg-gray-900 text-white">
        {/* Left Sidebar (Episodes List) - Hidden on Mobile */}
        <ScrollArea className="hidden md:block h-[60vh] w-full md:w-1/4 p-4 border-r border-gray-700" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">List of episodes:</h2>
            {episodes?.map((ep: any, index: number) => (
              <div
                key={index}
                className={`w-full h-full flex flex-col justify-center items-center cursor-pointer`}
              >
                <NavLink
                  to={`/watch2/${ep.episodeId}`}
                  className={`p-2 rounded cursor-pointer w-full ${location.pathname.split("/")[2] + location.search.split("&")[0] ===
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
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loader1"></span>
              </div>
            ) : videoData?.videoURL ? (
              <VideoPlayer2 key={`${epid}-${ep}-${server}-${category}`} src={videoData.videoURL} captions={videoData.tracks} proxyHeaders={{
                "Referer": "https://aniwatchtv.to/",
                "Origin": "https://aniwatchtv.to/"
              }} />
            ) : (
              <p className="text-white">No video available</p>
            )}
          </div>

          {/* Server Buttons */}
          <div className="mt-4 flex items-center justify-between text-sm gap-3 flex-wrap">
            <span className="flex flex-wrap items-center gap-1">
              SUB:{"    "}
              <NavLink to={`/watch2/${videoData?.server.episodeId}&category=sub`}>
                <Button variant="outline" className="bg-black hover:bg-gray-800 hover:text-white" >
                  Server 1
                </Button>
              </NavLink>
              {videoData?.server?.sub?.map((item: any, index: any) => (
                // <NavLink to={`/watch2/${videoData?.server.episodeId}&server=${item.serverName}&category=sub`} key={index}>
                  <Button variant="outline" className="bg-black hover:bg-gray-800 hover:text-white" key={index}  onClick={() =>
                    toast("This Server is Temporarily unavailable", {
                      // description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }>
                    {item.serverName.toUpperCase()}
                  </Button>
                // </NavLink>
              ))}
            </span>
            <span className="flex flex-wrap items-center gap-1">
              DUB:{"    "}
              <NavLink to={`/watch2/${videoData?.server.episodeId}&category=dub`}>
                <Button variant="outline" className="bg-black hover:bg-gray-800 hover:text-white" >
                  Server 1
                </Button>
              </NavLink>
              {videoData?.server?.dub?.map((item: any, index: any) => (
                // <NavLink to={`/watch2/${videoData?.server.episodeId}&server=${item.serverName}&category=dub`} key={index}>
                  <Button variant="outline" className="bg-black hover:bg-gray-800 hover:text-white" key={index} 
                  onClick={() =>
                    toast("This Server is Temporarily unavailable", {
                      // description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                    {item.serverName.toUpperCase()}
                  </Button>
                // </NavLink>
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


        {/* Episodes List (Mobile Only) */}
        <ScrollArea className="block md:hidden h-[60vh] w-full p-4 border-t border-gray-700 order-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">List of episodes:</h2>
            {episodes?.map((ep: any, index: number) => (
              <div
                key={index}
                className={`w-full h-full flex flex-col justify-center items-center cursor-pointer`}
              >
                <NavLink
                  to={`/watch2/${ep.episodeId}`}
                  className={`p-2 rounded cursor-pointer w-full ${location.pathname.split("/")[2] + location.search ===
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

        {/* Right Sidebar (Anime Info) */}
        <aside className="w-full md:w-1/4 p-4 border-l border-gray-700 order-3">
          <img
            src={animeInfo?.info?.img}
            alt={animeInfo?.info?.name || "Anime Image"}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">{animeInfo?.info?.name || "Loading..."}</h2>
          <p className="text-sm text-gray-400">
            {animeInfo?.info?.description.length > 50
              ? animeInfo?.info?.description.substring(0, 600) + "..."
              : animeInfo?.info?.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-yellow-400 px-2 py-1 text-black text-xs">
              {animeInfo?.moreInfo?.["MAL Score:"] ?? "N/A"}
            </span>
            <Star size={20} className="text-yellow-400" />
          </div>
          <h3 className="mt-4 text-lg">What do you think?</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
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
      </div>



      {/* Recommended Section */}
      <div className="my-24" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <h1 className="text-2xl text-[#A52010] mb-3 font-[Brutefont]">Recommend For You</h1>
        {animeInfo?.recommendedAnimes?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimeCard Alldata={animeInfo.recommendedAnimes} />
          </div>
        )}
      </div>
    </>
  );
};

export default AnimeWatchPage;
