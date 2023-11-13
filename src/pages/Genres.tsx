import { Icon } from "@iconify/react/dist/iconify.js";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);

        const genreRes = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list"
        );

        setGenres(genreRes.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);
  return (
    <>
      <div className="py-10 px-36">
        <Navbar />

        <div className="mt-20 ">
          <h1 className="text-xl text-gray font-medium flex justify-center items-center gap-x-2">
            <Icon icon="ic:round-category" />
            Available Genres
          </h1>
          {loading ? (
            <div className="flex justify-center items-center mt-20">
              <Loader color="gray" size="sm" />
            </div>
          ) : null}
          <div className="flex justify-center mt-10">
            <div className="grid grid-cols-7 text-center gap-5">
              {genres.map((genre) => (
                <Link key={genre.id} to={`/genres/${genre.id}`}>
                  <div className="px-6 py-2 rounded-full bg-slate-100 border border-slate-100 shadow-md hover:bg-white hover:shadow-none hover:border-gray cursor-pointer transition-all duration-300">
                    {genre.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0">
        <Footer />
      </div>
    </>
  );
};

export default Genres;
