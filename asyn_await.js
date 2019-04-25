// write a function to retrieve a blob of json
// make a ajax request ! use the 'fetch' function
// https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//   fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json())
//     .then(json => console.log(json));
// }
// fetchAlbums();

//Async Request // returns a promise
//.then()   // called if  request is successful with
// the value returned from the async request

//fetch() // returns a promise
//.then(res => res.json())// fetch resolves its promise with an
// object representing the request . you can get the real json
// response by calling the 'json()' on it . this returns
//'another'promise

// .then(json => console.log(json)) // after getting the
// json console log it

// here here the async-await syntex
// used for handling asynchronous request
// async function fetchAlbums() {
//   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//   const json = await res.json();
//   console.log(json);
// }
// fetchAlbums();

const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();
  console.log(json);
};
fetchAlbums();
