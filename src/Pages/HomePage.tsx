import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import AnimeCard from "@/components/AnimeCard";
import TopAiring from "@/components/HomeLatestAnimePage";
import Top10Animes from '../components/topanime10';
import Genres from "@/components/genreComponent";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "../assets/Images/search.png";
import '../css/Loader.css';



export function HomePage() {

  const navigate = useNavigate();

  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [SearchValue, setSearchVlaue] = useState('');

  // Fetch Anime List using TanStack Query
  const { data, isLoading, error } = useQuery({queryKey:["animeData"], queryFn:async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/`);
    return response.data;
  },staleTime: 1000 * 60 * 5,refetchOnMount:false});


  const {
    spotLightAnimes: animeList = [],
    trendingAnimes: tendinganime = [],
    featuredAnimes: {
      topAiringAnimes: topairing = [],
      latestCompletedAnimes: latestCompleted = [],
      mostFavoriteAnimes: mostfavouraite = [],
      mostPopularAnimes: mostpopular = [],
    } = {},
    latestEpisodes: latestepisode = [],
    topUpcomingAnimes: topupcoming = [],
    top10Animes: top10 = [],
    genres = [],
  } = data || {};


  const SearchKeydown=(e:any)=>{
    if(e.key=="Enter" && SearchValue!==""){
      navigate(`/search?keyword=${SearchValue}`);
    }
  }

  // Carousel State Management
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const formattedTop10 = Array.isArray(top10)
    ? { day: [], week: [], month: [] } // Default empty structure
    : top10;


  return (
    <>
      {isLoading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <p className="text-red-500">Failed to load anime list. Please try again.</p>
      ) : (
        <div className="w-full flex flex-col items-center">
          {animeList?.length ? (
            <Carousel setApi={setApi} plugins={[plugin.current]} className="h-[300px] w-[100%]">
              <CarouselContent>
                {animeList.map((anime:any, index:any) => (
                  <CarouselItem key={index} className="w-full flex justify-center relative z-10">
                    <img
                      src={anime?.img}
                      alt={anime?.title}
                      className="w-full sm:w-[90%] md:w-[90%] lg:w-[100%] aspect-video h-[200px] sm:h-[300px] object-cover shadow-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-[75px] sm:bottom-[-23px] w-full flex justify-center items-center">
                <div className="relative w-[90%] md:w-[80%] lg:w-[50%]" onKeyDown={(e)=>SearchKeydown(e)}>
                  <Input
                    className="w-full h-12 bg-white px-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    onChange={(e) => setSearchVlaue(e.target.value)}
                  />
                  <NavLink
                    to={`/search?keyword=${SearchValue}`}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <img
                      src={SearchIcon}
                      alt="Search"
                      className="w-10 h-10 p-2 rounded-sm transition-all duration-300"
                    />
                  </NavLink>
                </div>
              </div>
            </Carousel>
          ) : (
            <p className="text-gray-500">No anime available.</p>
          )}

          <div className="p-10">
            <div className="sharethis-inline-share-buttons"></div>
          </div>

          <div className="w-full flex items-start pb-3">
            <h1 className="text-2xl font-[BruteFont] text-[#A52010]">Trending Anime</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <AnimeCard Alldata={tendinganime} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-center justify-center py-10" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {[
              { data: topairing, title: "Top Airing", link: "top-airing" },
              { data: mostpopular, title: "Most Popular", link: "most-popular" },
              { data: mostfavouraite, title: "Most Favorite", link: "most-favorite" },
              { data: latestCompleted, title: "Latest Completed", link: "last-completed" }
            ].map((item, index) => (
              <div key={index} className="w-full flex-grow min-w-[290px] sm:min-w-[350px]">
                <TopAiring lastestAnime={item.data} head={item.title} link={item.link} />
              </div>
            ))}
          </div>

          <div className="w-full flex items-start pb-3">
            <h1 className="text-2xl font-[BruteFont] text-[#A52010]">Latest Episode</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <AnimeCard Alldata={latestepisode} />
          </div>

          <div className="w-full flex items-start pb-3">
            <h1 className="text-2xl font-[BruteFont] text-[#A52010]">Top Upcoming Anime</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <AnimeCard Alldata={topupcoming} />
          </div>

          {top10 && <Top10Animes top10Animes={formattedTop10} />}

          <div className="py-10 w-full" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Genres genres={genres} />
          </div>
        </div>
      )}
    </>
  );
}