import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { HomePage } from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import {Footer} from './components/Footer';
import SpecificAnimePage from "./Pages/SpecificAnimePage";
import AnimeWatchPage from './Pages/VidePage';
import AllContextProvider from "./context/AllContext";
import SearchResultPage from "./Pages/SearchResultPage";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      
      <BrowserRouter>
      <Navbar />
      <hr className="w-full"/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies" element={<HomePage />} />
          <Route path="/tv-series" element={<HomePage />} />
          <Route path="/top-airing" element={<HomePage />} />
          <Route path="/watch/:id" element={<SpecificAnimePage />} />
          <Route
          path="/watch2/:epid"
          element={
            <AllContextProvider>
              <AnimeWatchPage />
            </AllContextProvider>
          }
        />
        <Route path="/search" element={<SearchResultPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    
      </div>
      </>
  );
}

export default App;
