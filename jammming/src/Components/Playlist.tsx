import React, { ChangeEvent } from 'react'
import { ITrack } from '../interfaces'
import Tracklist from './Tracklist'

interface PlaylistProps {
  listName: string
  playlistTracks: ITrack[]
  onClick: (track: ITrack) => void
  onChangeName: (name: string) => void
  onSave: () => void
}

const Playlist = ({ listName, playlistTracks, onChangeName, onClick, onSave}: PlaylistProps) => {
  const changeListName = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeName(e.target.value)
  }
  
  return (
    <div>
      <h2>Your Playlist</h2>
      <input type="text" value={listName} onChange={changeListName} placeholder='Name your playlist' className='text-black' />
      <Tracklist tracks={playlistTracks} handlePlaylistAction={onClick} inPlaylist={true} emptyState='Nothing in your playlist yet! Add tracks from the search results...' />
      <button onClick={onSave}>Save Playlist</button>
    </div>
  )
}

export default Playlist