import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Define Context Type
interface AllContextType {
  data: string[] | null;
  setData: (data: string[] | null) => void;
  fetchDataSpeicifcAnime: () => Promise<void>;
  animeData: any; 
  episode: any; 
  videoData: any;
  firstEpisode: string | null;
  setEpisodes:any;
  setAnimeData:any;
}

// Create Context with Initial Type (undefined allowed)
export const AllContext = createContext<AllContextType | undefined>(undefined);

// Custom Hook for Using Context
export const useAllContext = (): AllContextType => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error("useAllContext must be used within an AllContextProvider");
  }
  return context;
};

// Provider Props Type
interface AllContextProviderProps {
  children: ReactNode;
}

// Context Provider Component
const AllContextProvider: React.FC<AllContextProviderProps> = ({ children }) => {
  const { id } = useParams();
  const [data, setData] = useState<string[] | null>(null);
  const [animeData, setAnimeData] = useState([]);
  const [episode, setEpisodes] = useState([]);
  const [videoData, setVideoData] = useState<string>("");
  const [firstEpisode, setFirstEpisode] = useState<string | null>(null);

  // Fetch Anime Data (Runs Only When Component Mounts)
  useEffect(() => {
    if (!id) return; // Ensure id exists before fetching data

    const fetchData = async () => {
      try {
        setVideoData(id);
        const animeResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/anime/${id}`);
        setAnimeData(animeResponse.data.info);
        console.log("Anime Data:", animeResponse.data.info);

        const episodeResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/episodes/${id}`);
        setEpisodes(episodeResponse.data);
        setFirstEpisode(episodeResponse.data.episodes[0]?.episodeId || null);
        console.log("Episodes Data:", episodeResponse.data.episodes[0]?.episodeId);
        
        
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchData();
  }, [id]); // Runs only when the `id` changes

  // Context Value
  const value: AllContextType = {
    data,
    setData,
    fetchDataSpeicifcAnime: async () => {}, // Not needed anymore, data loads on mount
    animeData,
    episode,
    videoData,
    firstEpisode,
    setEpisodes,
    setAnimeData,

  };

  return <AllContext.Provider value={value}>{children}</AllContext.Provider>;
};

export default AllContextProvider;
