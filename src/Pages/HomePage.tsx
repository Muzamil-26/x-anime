import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState, useRef, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Input } from "@/components/ui/input";
import AnimeCard from "@/components/AnimeCard";
import TopAiring from "@/components/HomeLatestAnimePage";
import Top10Animes from '../components/topanime10'
import Genres from "@/components/genreComponent";



export function HomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const [animeList, setAnimeList] = useState([] as any[]);
  const [tendinganime, settendinganime] = useState([] as any[]);
  const [topairing, settopairing] = useState([] as any[]);
  const [latestCompleted, setlatestCompleted] = useState([] as any[]);
  const [mostpopular, setmostpopular] = useState([] as any[]);
  const [mostfavouraite, setmostfavouraite] = useState([] as any[]);
  const [latestepisode, setlatestepisode] = useState([] as any[]);
  const [topupcoming, settopupcoming] = useState([] as any[]);
  const [genres, setgenres] = useState([] as any[]);
  const [top10, settop10] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Anime List
  const fetchAnimeList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/`);
      setAnimeList(response.data.spotLightAnimes);
      settendinganime(response.data.trendingAnimes);
      settopairing(response.data.featuredAnimes.topAiringAnimes);
      setlatestCompleted(response.data.featuredAnimes.latestCompletedAnimes);
      setmostfavouraite(response.data.featuredAnimes.mostFavoriteAnimes);
      setmostpopular(response.data.featuredAnimes.mostPopularAnimes);
      setlatestepisode(response.data.latestEpisodes);
      settopupcoming(response.data.topUpcomingAnimes);
      settop10(response.data.top10Animes);
      setgenres(response.data.genres);
      if (import.meta.env.MODE === "development") {
        console.log("Fetched anime list:", response.data);
      }
    } catch (error) {
      console.error("Error fetching anime:", error);
      setError("Failed to load anime list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

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
    <div className="w-full flex flex-col items-center">

      {loading ? (
        <p className="text-gray-500 py-10">Loading anime...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : animeList?.length ? (
        <Carousel setApi={setApi} plugins={[plugin.current]} className="h-[300px] w-[100%]">
          {/* <div className="h-[200px] sm:h-[300px] absolute top-0 left-0 w-full bg-[#0000002c] z-10 transition-all"></div> */}
          <CarouselContent>
            {animeList?.map((anime, index) => (
              <CarouselItem key={index} className="w-full flex justify-center relative z-10 ">
                <img
                  src={anime?.img}
                  alt={anime?.title}
                  className="w-full sm:w-[90%] md:w-[90%] lg:w-[100%] aspect-video h-[200px] sm:h-[300px] object-cover shadow-xl"
                />

              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-[75px] sm:bottom-[-23px] w-full flex justify-center items-center">
            <Input className="w-[70%] lg:w-[50%] h-12 bg-white z-20" />
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


      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-center justify-center py-10"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
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



      <div className={"py-10 w-full "} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <Genres genres={genres} />
      </div>


    </div>
  );
}
