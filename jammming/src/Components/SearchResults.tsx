import { ISpotifyTrack } from '../interfaces'
import Track from './Track'

interface searchResultsProps {
  tracks: ISpotifyTrack[]
  onClick: (trackId: string) => void
}

const SearchResults = ({ tracks, onClick }: searchResultsProps) => {
  return (
    <div className="flex flex-col w-full">
      <h2>Search Results</h2>
      <ul className="flex flex-col gap-4">
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            trackBtnAction='Add to'
            inPlaylist={false}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
