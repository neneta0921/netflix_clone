const APP_KEY = '7e43b2b8cc1a2025084701191c6f6114'

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${APP_KEY}&language`,
  fetchNetflixOriginals: `/discover/tv?api_key=${APP_KEY}&with_networks=213`,
  fetchTopRated: `/discover/tv?api_key=${APP_KEY}&languager=en-us`,
  fetchActionMovies: `/discover/tv?api_key=${APP_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/tv?api_key=${APP_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/tv?api_key=${APP_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/tv?api_key=${APP_KEY}&with_genres=10749`,
  fetchDocumentMovies: `/discover/tv?api_key=${APP_KEY}&with_genres=99`,
}
