import { ISpotifyTrack } from "../interfaces";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
let accessToken: string;  // This will be used to store the access token
const redirectUri = 'http://localhost:5173'  // This is the redirect URI that we will use to redirect the user back to our app
let userId: string;  // This will be used to store the user ID

const Spotify = {
  async getAuth () {
    if (accessToken) {
      return accessToken;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location.href = accessUrl;
    }
  },
  async checkAuth() {
    const token = await Spotify.getAuth()
    return token
  },
  async getUsername() {
    if (!accessToken) {
      return Promise.reject(new Error('No access token'))
    }
    const nameEndpoint = 'https://api.spotify.com/v1/me'
    return fetch(nameEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch user data')
      }
    }).then(data => {
      const userName = data.display_name
      userId = data.id
      return userName
    })
  },
  async search(searchTerm: string) {
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`

    return fetch(searchEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then( response => response.json())
    .then((data) => {
      if (!data.tracks) {
        return []
      }
      const trackResults = data.tracks.items.map((track: ISpotifyTrack) => ({
        id: track.id,
        name: track.name,
        artists: track.artists,
        album: track.album,
        preview_url: track.preview_url,
        explicit: track.explicit,
        uri: track.uri
      }))
      return trackResults
    })
  },

  async createPlaylist(listName: string, urisArray: string[]) {
    const createListUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
    const playlistData = {
      'name': listName,
    }
    return fetch (createListUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlistData)
    })
    .then(response => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw new Error('Failed to create playlist')
      }
    })
    .then(data => {
      const playlistId = data.id
      const tracksToAdd = {
        'uris': urisArray
      }

      console.log(tracksToAdd)

      const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      return fetch(addTracksUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tracksToAdd)
      })
    })
    .then((res) => res.json())
    .then((result) => {
      if (result) {
        return true
      } else {
        return false
      }
    })
  }
}

export default Spotify