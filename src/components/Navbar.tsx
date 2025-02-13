import {useState } from "react";
import logo from "../assets/Images/logo.png";
import searchIcon from "../assets/Images/search.png";
import { NavLink } from "react-router-dom";
import MenuIcon from "../assets/Images/menuicon.png";
import backIcon from "../assets/Images/back.png";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";
// import axios from 'axios';
// import { SearchIcon } from "lucide-react";


const Navbar = () => {
  const [toggle, settoggle] = useState(false);
  // const [Search,setSearch]=useState(false);
  const [SearchValue,setSearchVlaue]=useState('');

  // const navigate = useNavigate();

  const togglee = () => {
    settoggle(!toggle);
  };

  // const api = axios.create({
  //   baseURL: "https://muzamilapi2.vercel.app",
  //   headers: { "Content-Type": "application/json" },
  // });

  const SearchValue1=SearchValue.trim().split(" ").join("+");

  console.log(SearchValue1);

  return (
    <>
    <div className="flex items-center justify-between py-5 font-medium ">
      <NavLink to={"/"}>
        <img src={logo} alt="LOGO" width={70} height={70} className="border-red-500 border-2 rounded-full"  />
      </NavLink>

     

      <div className="flex items-center gap-2 cursor-pointer">
      <Input type="search" className="lg:w-96 md:w-60 focus:border-gray-400 hidden md:flex" onChange={(e)=>{setSearchVlaue(e.target.value)}}/>
        <div className="relative inline-block group">
        
          <NavLink to={`/search?keyword=${SearchValue1}`}>
            <img src={searchIcon} alt="Search" className="w-5 hidden md:flex"/>
          </NavLink>
          <div className="absolute left-0 mt-2 w-20 p-2 text-center bg-black border lg:hidden border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
            <p className="text-xs text-white font-semibold">Search</p>
          </div>
        </div>




      <Dialog>
      <DialogTrigger asChild>
        <img src={searchIcon} alt="Search" className="w-5 lg:hidden md:hidden"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search Anime...</DialogTitle>
          <DialogDescription>
          Watch Anime Online, Free Anime Streaming Online on XAnime.to Anime Website
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              onChange={(e)=>{setSearchVlaue(e.target.value)}}
            />
          </div>
          <NavLink to={`/search?keyword=${SearchValue1}`}>
          <DialogClose asChild>
          <Button type="submit" className="bg-white px-3 hover:bg-gray-200" size="sm" >
            <span className="sr-only">Search</span>
           
            <img src={searchIcon} alt="Search" className="w-5 md:flex"/>
         
          </Button>
          </DialogClose>
          </NavLink>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>


        <div onClick={togglee}>
          <img
            src={MenuIcon}
            alt="Cart"
            className="w-5 cursor-pointer md:hidden"
          />
        </div>
        
      </div>

      <ul className="hidden md:flex gap-5 text-sm text-gray-700 transition-all">
        <NavLink
          to={"/home"}
          className="navbarlinks flex flex-col items-center gap-1"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/movies"}
          className="navbarlinks flex flex-col items-center gap-1"
        >
          <p>MOVIES</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/tv-series"}
          className="navbarlinks flex flex-col items-center gap-1"
        >
          <p>TV SERIES</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/top-airing"}
          className="navbarlinks flex flex-col items-center gap-1"
        >
          <p>TOP AIRING</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      
      {toggle && (
        <div className="absolute top-0 right-0 bottom-0 overflow-hidden z-10 bg-white transition-all w-full">
          <div className="menuicon flex flex-col text-gray-600">
            <div
              className="flex items-center gap-4 p-3 cursor-pointer"
              onClick={() => settoggle(false)}
            >
              <img src={backIcon} alt="Back" className="h-4 rotate-180" />
              <p>Back</p>
            </div>
            <NavLink to={"/home"} className="py-2 pl-6 border" onClick={() => settoggle(false)}>
              <p>HOME</p>
            </NavLink>
            <NavLink to={"/movies"} className="py-2 pl-6 border" onClick={() => settoggle(false)}>
              <p>MOVIES</p>
            </NavLink>
            <NavLink to={"/tv-series"} className="py-2 pl-6 border" onClick={() => settoggle(false)}>
              <p>TV SERIES</p>
            </NavLink>
            <NavLink to={"/top-airing"} className="py-2 pl-6 border" onClick={() => settoggle(false)}>
              <p>TOP AIRING</p>
            </NavLink>
          </div>
          
        </div>
      )}
    </div>
    </>
  );
};

export default Navbar;
