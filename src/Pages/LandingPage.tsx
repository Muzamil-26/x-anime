import HeroImg from "../assets/Images/xLandingImage.webp";
import xAnime from "../assets/Images/text-1739168209116.png";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import '../css/Loader.css';
// embla carosuel slider is downloaded use it

const LandingPage = () => {

  return (
    <>
      <div className="flex flex-col sm:flex-row mt-10 gap-5">
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141] px-8">
            <div className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              <img src={xAnime} alt="TextLogo" />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base w-[80%]">
                Welcome to X-Anime - Your Ultimate Destination for Anime
                Streaming & Discovery!
              </p>
            </div>
          </div>
        </div>
        <img className="w-full sm:w-1/2" src={HeroImg} alt="Hero Images" />
      </div>
      {/* <hr className='w-full mt-7' /> */}

      <NavLink to={"/home"}>
        <div className="w-full flex justify-center items-center mt-8">
          <Button
            variant="outline"
            size="icon"
            className="text-xl w-fit px-10 h-14 font-[Ninja1] flex justify-center items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Enter HomePage <ChevronRight />
          </Button>
        </div>
      </NavLink>

      <div className="p-10">
        <div className="sharethis-inline-share-buttons"></div>
      </div>

      <div className="flex flex-col pb-7">
        <div className="pb-7">
          <h1 className="text-3xl font-bold">
            X-Anime - The Best Site to Watch Anime Online for Free
          </h1>
        </div>
        <div className="text-gray-500">
          <p>
            Did you know that anime-related topics are searched over 1 billion
            times a month on Google? Anime has taken the world by storm, and
            with its growing popularity, the demand for free anime streaming
            sites has skyrocketed.
          </p>
          <p>
            Just like movie streaming platforms, not all anime sites are created
            equal. Some offer a better experience than others, and that's why we
            built <strong className="text-black font-bold">X-Anime</strong> a
            top-tier free anime streaming site designed for anime fans
            worldwide. Enjoy a seamless, high-quality anime-watching experience
            anytime, anywhere!
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="py-5">
          <AccordionTrigger className="text-xl font-bold">
            What is X-Anime.to?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              X-Anime is a free anime streaming site where you can watch your
              favorite anime online in high definition. You can choose between
              English subtitles or dubbed versions based on your preference.
              Plus, you can download any anime without the need for registration
              or payment—everything here is completely free!
            </p>
            <p>
              User accounts are optional, but they allow you to create
              watchlists, import watchlists, save your favorite anime shows, and
              continue watching from where you left off. You can also organize
              your anime into folders and even use Watch Together to enjoy anime
              with friends in real time!
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="py-5">
          <AccordionTrigger className="text-xl font-bold">
            Is X-Anime Safe?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, X-Anime is safe. Our goal is to provide an excellent user
              experience while ensuring security. We do not require unnecessary
              personal information and prioritize smooth, ad-free streaming. If
              you ever notice anything suspicious, please report it to us—we are
              committed to maintaining a secure and enjoyable anime-watching
              environment.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="py-5">
          <AccordionTrigger className="text-xl font-bold">
            What Makes X-Anime the Best Site to Watch Anime for Free?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              With so many anime streaming sites out there, X-Anime stands out
              as the ultimate destination for anime lovers. Here's why:
            </p>
            <div>
              <ul>
                <li>
                  {" "}
                  ✅ Massive Anime Library - From trending seasonal anime to
                  timeless classics, we've got it all.
                </li>
                <li>
                  ✅ HD Streaming with No Ads - Enjoy smooth, high-quality anime
                  streaming without annoying interruptions.
                </li>
                <li>
                  ✅ Fast & Reliable Updates - We add the latest episodes
                  shortly after release, so you never miss out.
                </li>
                <li>
                  ✅ Completely Free - No subscriptions, no hidden fees—just
                  pure anime enjoyment.
                </li>
                <li>
                  ✅ User-Friendly Interface - Easy navigation, responsive
                  design, and a sleek dark theme for the best viewing
                  experience.
                </li>
                <li>
                  ✅ Multi-Device Compatibility - Watch anime anytime, anywhere,
                  on any device.
                </li>
              </ul>
            </div>
            <p>
              At X-Anime, we are dedicated to providing the best anime streaming
              experience. Join us today and dive into the world of anime for
              free! 🎉🔥
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="py-5">
          <AccordionTrigger className="text-xl font-bold">
            Is X-Anime completely free?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes! X-Anime is 100% free to use. You can watch and download anime
              without any subscriptions or hidden fees. No registration is
              required, but signing up allows you to save watchlists and track
              your progress.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="py-5">
          <AccordionTrigger className="text-xl font-bold">
            Can I watch anime with my friends on X-Anime?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Absolutely! X-Anime offers a Watch Together feature, allowing you
              to sync and watch anime with friends in real-time. Just pick your
              favorite anime and enjoy it together, no matter where you are! 🎉
            </p>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </>
  );
};

export { LandingPage };
