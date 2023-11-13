import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Loader } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";

const Genre = () => {
  const { id } = useParams<{ id: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`
        );

        const genreRes = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list"
        );

        setMovies(movieRes.data.results);
        setGenres(genreRes.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getGenre = (genresId: number[]): string[] => {
    return genresId.map(
      (id) => genres.find((genre) => genre.id === id)?.name || ""
    );
  };

  const getSingleGenre = (id) => {
    return genres.find((genre) => genre.id.toString() === id)?.name || "";
  };

  return (
    <>
      <div className="py-10 px-36">
        <Navbar />

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader color="gray" size="sm" />
          </div>
        ) : null}

        <h1 className="mt-20 text-xl text-gray font-medium flex justify-center items-center gap-x-2">
          <Icon icon="ic:round-category" />
          {getSingleGenre(id)}
        </h1>

        <div className="grid grid-cols-5 gap-x-16">
          {movies.map((movie) => (
            <div key={movie.id} className="mt-10">
              <Link to={`/movies/${movie.id}`}>
                <img
                  className="w-80 rounded-md"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3 className="mt-5 font-medium">{movie.title}</h3>
                <p className="text-gray">
                  {/* {getGenre(movie.genre_ids).join(", ")} */}
                </p>
                <p className="mt-3 text-slate-500 ">
                  {new Date(movie.release_date).toUTCString().slice(0, 16)}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute">
          <div className="flex items-center gap-x-2 text-sm mt-16">
            <Icon icon="raphael:arrowleft" color="#242424" />
            <Link to="/genres">back</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Genre;
