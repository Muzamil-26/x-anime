import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimeCard from "@/components/AnimeCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import '../css/Loader.css';

const fetchSearchData = async (keyword: string) => {
    const formattedKeyword = keyword.trim().split(" ").join("+");
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/search?keyword=${formattedKeyword}`);
    return response.data.animes;
};

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18; // Adjust as needed

    const { data: searchData = [], isLoading, isError } = useQuery({
        queryKey: ["searchResults", keyword],
        queryFn: () => fetchSearchData(keyword),
        enabled: !!keyword, // Prevents running query if keyword is empty
    });

    // Pagination logic
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const totalPages = Math.ceil(searchData.length / itemsPerPage);
    const currentResults = searchData.slice(firstIndex, lastIndex);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Search Results for: <span className="text-yellow-400">{keyword}</span>
            </h1>

            {/* Loading State */}
            {isLoading && (
                <div className="w-full h-[80vh] flex justify-center items-center">
                <span className="loader"></span>
              </div>
            )}

            {/* Error State */}
            {isError && <p className="text-red-500">Failed to load results. Please try again.</p>}

            {/* Results Grid */}
            {!isLoading && searchData.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <AnimeCard Alldata={currentResults} />
                </div>
            )}

            {/* Pagination */}
            {searchData.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-6 gap-2">
                    <Button
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </Button>

                    <span className="text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* No Results */}
            {!isLoading && searchData.length === 0 && <p>No results found.</p>}
        </div>
    );
};

export default SearchResultPage;
