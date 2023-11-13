import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PopularMovies from "./components/PopularMovies";
import { Icon } from "@iconify/react";

const App = () => {
  return (
    <>
      <div className="py-10 px-36">
        <Navbar />

        <div className="mt-20 h-[90vh]">
          <div>
            <p className="text-gray">With power and magic.</p>
            <h1 className=" uppercase text-8xl font-bold max-w-[40%] mt-3 bg-[url('/city.jpg')] bg-no-repeat bg-cover bg-clip-text text-transparent">
              Movie change the world
            </h1>
          </div>
          <div className="mt-20 text-3xl flex gap-x-5 text-bg">
            <Icon
              className="hover:text-blue transition-colors cursor-pointer duration-200"
              icon="ri:instagram-fill"
            />
            <Icon
              className="hover:text-blue transition-colors cursor-pointer duration-200"
              icon="ic:outline-facebook"
            />
            <Icon
              className="hover:text-blue transition-colors cursor-pointer duration-200"
              icon="mdi:github"
            />
          </div>
        </div>

        <PopularMovies />
      </div>
      <Footer />
    </>
  );
};

export default App;
