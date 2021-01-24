import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
// @ts-ignore
import movieTrailer from 'movie-trailer'

import axios from '../../axios'
import './Row.scss'

type Props = {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

type Movie = {
  id: string
  name: string
  title: string
  original_name: string
  poster_path: string
  backdrop_path: string
}

type TrailerOptions = {
  height: string
  width: string
  playerVars: {
    autoplay: 0 | 1 | undefined
  }
}

const base_url = 'https://image.tmdb.org/t/p/original/'

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [trailerUrl, setTrailerUrl] = useState<string | null>('')

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const options: TrailerOptions = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      try {
        const trailerUrl = await movieTrailer(
          movie?.name || movie?.title || movie?.original_name || '',
        )
        const urlParams = await new URLSearchParams(new URL(trailerUrl).search)
        setTrailerUrl(urlParams.get('v'))
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={options} />}
    </div>
  )
}
