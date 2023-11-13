import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader } from "@mantine/core";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const autoplay = useRef(Autoplay({ delay: 2500 }));

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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
      <h1 className="text-xl font-semibold mb-8 flex items-center gap-x-3">
        <Icon
          className="text-2xl"
          icon="solar:fire-bold-duotone"
          color="#242424"
        />
        Popular Movies
      </h1>
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader color="gray" size="sm" />
        </div>
      ) : null}
      <Carousel slideSize="15%" align="start" plugins={[autoplay.current]} loop>
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <img
              className="w-56 rounded-md"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="mt-5 font-medium">{movie.title}</h3>
            <p className="text-gray">{getGenre(movie.genre_ids).join(", ")}</p>
            <p className="mt-3 text-slate-500 ">
              {new Date(movie.release_date).toUTCString().slice(0, 16)}
            </p>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default PopularMovies;
