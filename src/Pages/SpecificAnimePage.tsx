import axios from "axios";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import AnimeDetails from "@/components/SpecificComponents";
import { useQuery } from "@tanstack/react-query";
import '../css/Loader.css';
import { ScrollArea } from "@/components/ui/scroll-area";

const fetchAnimeDetails = async (id: string) => {
  const animeResponse = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/aniwatch/anime/${id}`
  );

  const episodeResponse = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/aniwatch/episodes/${id}`
  );

  return {
    anime: animeResponse.data,
    episodes: episodeResponse.data.episodes || [],
    firstEpisode: episodeResponse.data.episodes[0]?.episodeId || null,
  };
};

const SpecificAnimePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["specificAnime", id],
    queryFn: () => fetchAnimeDetails(id as string),
    enabled: !!id, // Only run query if id exists
  });

  if (isLoading) return <div className="w-full h-[80vh] flex justify-center items-center">
    <span className="loader"></span>
  </div>;
  if (error) return <div>Error fetching anime details.</div>;

  return (
    <div
      className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <AnimeDetails specific={data?.anime} firstEpisode={data?.firstEpisode} />

      {/* Episodes List */}
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-3 text-[#A52010] font-[Brutefont]">Episodes</h2>
        <ScrollArea className="w-full md:block h-[40vh] p-4 border-r">
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4">
          {data?.episodes.map((ep: any) => (
            <NavLink
              to={`/watch2/${ep.episodeId}`}
              key={ep.episodeId}
              className={`p-2 bg-gray-800 text-white rounded ${data?.firstEpisode === ep.episodeId ? "bg-yellow-500" : "hover:bg-gray-600"
                }`}
            >
              {ep.episodeNo}
            </NavLink>
          ))}
        </div>
        </ScrollArea>
      </div>

      {/* Recommended Animes */}
      {data?.anime.recommendedAnimes?.length > 0 && (
        <Section title="Recommended For You">
          <AnimeCard Alldata={data?.anime.recommendedAnimes} />
        </Section>
      )}

      {/* Most Popular Animes */}
      {data?.anime.mostPopularAnimes?.length > 0 && (
        <Section title="Most Popular Animes">
          <AnimeCard Alldata={data?.anime.mostPopularAnimes} />
        </Section>
      )}

      {/* Related Animes */}
      {data?.anime.relatedAnimes?.length > 0 && (
        <Section title="Related Anime">
          <AnimeCard Alldata={data?.anime.relatedAnimes} />
        </Section>
      )}
    </div>
  );
};

// Section Component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="my-24">
    <h1 className="text-2xl font-bold text-[#A52010] mb-3">{title}</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {children}
    </div>
  </div>
);

export default SpecificAnimePage;
