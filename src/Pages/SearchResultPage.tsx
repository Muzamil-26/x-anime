import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI library
import { Skeleton } from "@/components/ui/skeleton"; // Optional: For loading effect
import AnimeCard from "@/components/AnimeCard";

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [searchData, setSearchData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Change this as needed

    const SearchValue1 = keyword?.trim().split(" ").join("+");

    const fetchSearchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aniwatch/search?keyword=${SearchValue1}`);
            setSearchData(response.data.animes);
            console.log(response.data.animes);
        } catch (error) {
            setError("Failed to load results. Please try again.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (SearchValue1) fetchSearchData();
    }, [SearchValue1]);

    // Pagination logic
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const totalPages = Math.ceil((Array.isArray(searchData) ? searchData.length : 0) / itemsPerPage);
    const currentResults = Array.isArray(searchData) ? searchData.slice(firstIndex, lastIndex) : [];


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Search Results for: <span className="text-yellow-400">{keyword}</span>
            </h1>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array(10)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} className="h-40 w-full bg-gray-700" />
                        ))}
                </div>
            )}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Results Grid */}
            {!loading && searchData?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <AnimeCard Alldata={currentResults} />
                </div>
            )}

            {/* Pagination */}
            {searchData?.length > itemsPerPage && (
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
            {!loading && searchData?.length === 0 && <p>No results found.</p>}
        </div>
    );
};

export default SearchResultPage;
