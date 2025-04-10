import logo from "../assets/Images/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={logo} className="mb-5 w-16 rounded-full border-2 border-red-500" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            X-Anime - Your ultimate destination for free anime streaming. Watch,
            discover, and enjoy anime anytime, anywhere. Stay updated with the
            latest episodes, all in HD and ad-free!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">LINKS</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <NavLink to={"/home"}>Home</NavLink>
            <NavLink to={"/movies"}>Movies</NavLink>
            <NavLink to={"/tv-series"}>Tv Series</NavLink>
            <NavLink to={"/top-airing"}>Top Airing</NavLink>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {/* <li>+91 9892843567</li> */}
            <NavLink to={"mailto:muzamilkhan.26,10thc@gmail.com"}>
              muzamilkhan.26.10thc@gmail.com
            </NavLink>
            <NavLink
              to={"https://www.instagram.com/muzamil___26"}
              className="cursor-pointer"
            >
              Instagram:- muzamil___26
            </NavLink>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ X-Anime - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export {Footer};
