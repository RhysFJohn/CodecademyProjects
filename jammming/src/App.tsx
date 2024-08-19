import { useState, useEffect } from 'react'
import { Navbar, SearchBar, SearchResults, Playlist } from './Components'
import './App.css'
import Spotify from './api/spotifyApi';
import { ITrack } from './interfaces';
import { Helmet } from 'react-helmet-async';

function App() {
  const [userName, setUserName] = useState('')
  const [logged, setLogged] = useState(false)
  const [searchResults, setSearchResults] = useState<ITrack[]>([])
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([])
  const [playlistName, setPlaylistName] = useState('')

  const searchSpotify = async (searchTerm: string) => {
    const results = await Spotify.search(searchTerm)
    console.log(results)
    setSearchResults(results)
  }

  useEffect(() => {
    const authenticated = Spotify.checkAuth();
    if (authenticated) {
      Spotify.getUsername()
        .then((fetchName) => {
          setUserName(fetchName);
          setLogged(authenticated);
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
        });
    } else {
      console.log('Login failed');
    }

    console.log('playlistTracks updated: ', playlistTracks)
  },[playlistTracks])

  const loginHandler = () => {
    Spotify.getAuth()
  }

  const addTrack = (track: ITrack) => {
    console.log('Track to add:', track.uri);
  
    if (!track || !track.album) {
      console.error('Invalid track object:', track);
      return;
    }
  
    // Check if the URI is already in the playlist
    if (playlistTracks.includes(track.uri)) return;
  
    // Add only the URI to the playlistTracks state
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeTrack = (track: ITrack) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((t) => t !== track.uri))
  }

  const changeListName = (name: string) => {
    setPlaylistName(name)
  }

  const savePlaylist = async () => {
    if (playlistTracks.length === 0) {
      return;
    }

    const urisArray = playlistTracks.map((track) => track.uri)
    await Spotify.createPlaylist(playlistName, urisArray).then((res) => {
      if (res) {
        alert('Playlist saved successfully: ' + playlistName)
        setPlaylistName('')
        setPlaylistTracks([])
      }
    })
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Jammming | A Spotify Playlist Builder</title>
        <meta name='description' content='Spotify Playlist Builder' />
      </Helmet>
      <main className='h-dvh'>
        {!logged ? (
          <button onClick={loginHandler}>Login to Spotify</button>
        ): (
          <div className='flex flex-col items-center justify-center'>
            <h2>Welcome, {userName}</h2>
            <SearchBar onSearch={searchSpotify} />
            <div className="grid grid-cols-2 w-full">
              <SearchResults tracks={searchResults} onClick={addTrack}  />
              <Playlist playlistTracks={playlistTracks} listName={playlistName} onClick={removeTrack} onSave={savePlaylist} onChangeName={changeListName} />
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App
