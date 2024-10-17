import "./MoviesCarousel.scss";
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { checkFeatured } from "../../redux/MovieSlice";

export default function MoviesCarousel() {
  const movies = useSelector(state => state.movies.items);
  const dispatch = useDispatch();
  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    
    const watchedIds = JSON.parse(localStorage.getItem("watchedMovies")) || [];

    
    const sorted = [...movies]; 
    const watchedMovies = sorted.filter(movie => watchedIds.includes(movie.Id));
    const unWatchedMovies = sorted.filter(movie => !watchedIds.includes(movie.Id));

    setSortedMovies([...watchedMovies.reverse(), ...unWatchedMovies].slice(0,50)); 
  }, [movies]);

  const handleMovieClick = (movieId) => {
    const watchedIds = JSON.parse(localStorage.getItem("watchedMovies")) || [];

    if (!watchedIds.includes(movieId)) {
      watchedIds.push(movieId); 
      localStorage.setItem("watchedMovies", JSON.stringify(watchedIds));
    }

    setSortedMovies(prevMovies => {
      const movieToMove = prevMovies.find(movie => movie.Id === movieId);

      if (!movieToMove) return prevMovies;

      const updatedMovies = prevMovies.filter(movie => movie.Id !== movieId);

      return [movieToMove, ...updatedMovies]; 
    });

    dispatch(checkFeatured(movieId)); 
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      {sortedMovies.length > 0 ? (
        <Slider {...settings}>
          {sortedMovies.map((movie) => {
            return (
              <div key={movie.Id} onClick={() => handleMovieClick(movie.Id)}>
                <img src={movie.CoverImage} className="imgs" />
              </div>
            );
          })}
        </Slider>
      ) : (
        <p>No movies available</p> 
      )}
    </div>
  );
}
