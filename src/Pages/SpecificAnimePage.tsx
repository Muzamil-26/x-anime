import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import AnimeDetails from "@/components/SpecificComponents";

const SpecificAnimePage = () => {
  const { id } = useParams();
  const [specific, setSpecific] = useState<any>(null);
  const [topUpcoming, setTopUpcoming] = useState<any[]>([]);
  const [mostPopularAnimes, setMostPopularAnimes] = useState<any[]>([]);
  const [relatedAnimes, setRelatedAnimes] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [firstEpisode, setFirstEpisode] = useState<string | null>(null);

  const fetchAnimeDetails = async () => {
    try {
      // Fetch anime details
      const animeResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/aniwatch/anime/${id}`
      );

      // Fetch episode list
      const episodeResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/aniwatch/episodes/${id}`
      );




      setSpecific(animeResponse.data);
      setEpisodes(episodeResponse.data.episodes || []); // Ensure episodes is an array
      setFirstEpisode(episodeResponse.data.episodes[0]?.episodeId || null);

      setTopUpcoming(animeResponse.data.recommendedAnimes || []);
      setMostPopularAnimes(animeResponse.data.mostPopularAnimes || []);
      setRelatedAnimes(animeResponse.data.relatedAnimes || []);

      console.log("Anime Data:", animeResponse.data);
      console.log("Episodes Data:", episodeResponse.data);
    } catch (error) {
      console.error("Error fetching anime details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAnimeDetails();
    }
  }, [id]);

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <AnimeDetails specific={specific} firstEpisode={firstEpisode}/>

      {/* Episodes List */}
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-3 text-[#A52010] font-[Brutefont]">Episodes</h2>
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4">
          {episodes.map((ep) => (
            <NavLink to={`/watch2/${ep.episodeId}`}
              key={ep.episodeId}
              className={`p-2 bg-gray-800 text-white rounded ${
                firstEpisode === ep.episodeId ? "bg-yellow-500" : "hover:bg-gray-600"
              }`}
            >
              {ep.episodeNo}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Recommended Animes */}
      {topUpcoming.length > 0 && (
        <Section title="Recommended For You">
          <AnimeCard Alldata={topUpcoming} />
        </Section>
      )}

      {/* Most Popular Animes */}
      {mostPopularAnimes.length > 0 && (
        <Section title="Most Popular Animes">
          <AnimeCard Alldata={mostPopularAnimes} />
        </Section>
      )}

      {/* Related Animes */}
      {relatedAnimes.length > 0 && (
        <Section title="Related Anime">
          <AnimeCard Alldata={relatedAnimes} />
        </Section>
      )}
    </div>
  );
};

// Section Component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="my-24">
    <h1 className="text-2xl font-bold text-[#A52010] mb-3">{title}</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">{children}</div>
  </div>
);

export default SpecificAnimePage;
