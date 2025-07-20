const User = require('./models/user.js')
const Movie = require('./models/movie.js')
const Review = require('./models/review.js')
//const Test = require('./models/test.js')
const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  const loggedin = await axios.post('/accounts/session', {
    email: 'johan@hedman.de',
    password: '123456',
  })
  console.log('loggedin', loggedin.data)

  movieToWatchList = await axios.post(`/users/${loggedin.data._id}/watchlist`, {
    movie: movieSource.Search[6],
  })

  await axios.post(`/users/${loggedin.data._id}/reviews`, {
    movie: movieSource.Search[6],
    text: 'Test Review. One of the best movies ever!',
    rating: 5,
  })

  // const deleteMovieFromWatchList = await axios.delete(
  //   `/users/${jenny.data._id}/watchlist/${movieSource.Search[0].imdbID}`
  // )

  const movieToWatchedList = await axios.post(`/users/${loggedin.data._id}/watchedlist`, {
    movie: movieSource.Search[5],
  })

  // const deleteMovieFromWatchedList = await axios.delete(
  //   `/users/${jenny.data._id}/watchedlist/${movieSource.Search[1].imdbID}`
  // )
}

main()
console.log(`index.js is running`)
