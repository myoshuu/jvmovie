import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader } from "@mantine/core";

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`
        );
        setMovie(movieRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader color="gray" size="sm" />
        </div>
      ) : null}
      <div className="flex flex-col items-center p-10">
        <div className="absolute left-0 top-0 p-5">
          <div className="flex items-center gap-x-2 text-sm">
            <Icon icon="raphael:arrowleft" color="#242424" />
            <Link to="/movies">back</Link>
          </div>
        </div>
        {movie && (
          <div className="w-96">
            <h1 className="text-2xl font-semibold mb-3">{movie.title}</h1>
            <img
              className="rounded-md"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="text-sm mt-8">
              <p className="text-justify">{movie.overview}</p>
              <div className="mt-3">
                <div>
                  <span className="font-medium">Tagline : </span>
                  <span className="italic">{movie.tagline}</span>
                </div>
                <div>
                  <span className="font-medium">Budget : </span>
                  <span className="italic">
                    {formatter.format(movie.budget)}
                  </span>
                </div>
              </div>
              <p className="text-right text-gray mt-10">
                {new Date(movie.release_date).toUTCString().slice(0, 16)}
              </p>
            </div>
          </div>
        )}
        <div className="w-full absolute bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Movie;
