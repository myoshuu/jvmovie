import { Icon } from "@iconify/react/dist/iconify.js";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";
import { Link } from "react-router-dom";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${search}`
        );

        const movieRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular"
        );

        if (search) {
          setMovies(res.data.results);
        } else {
          setMovies(movieRes.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const movieRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular"
        );

        const genreRes = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list"
        );

        setMovies(movieRes.data.results);
        setGenres(genreRes.data.genres);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getGenre = (genreId: number[]): string[] => {
    return genreId.map(
      (id) => genres.find((genre) => genre.id === id)?.name || ""
    );
  };

  return (
    <>
      <div className="py-10 px-36">
        <Navbar />

        <div className="w-full flex justify-center">
          <h1 className="mt-20 text-xl text-gray font-medium flex items-center gap-x-2">
            <Icon icon="mingcute:movie-fill" color="#9F9F9F" />
            List Movies
          </h1>
        </div>
        <form action="">
          <input
            type="text"
            value={search}
            onChange={(e) => onChangeSearch(e)}
            className="border border-gray rounded-md px-5 py-2"
            placeholder="Search movie"
          />
        </form>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader color="gray" size="sm" />
          </div>
        ) : null}

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
                  {getGenre(movie.genre_ids).join(", ")}
                </p>
                <p className="mt-3 text-slate-500 ">
                  {new Date(movie.release_date).toUTCString().slice(0, 16)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
