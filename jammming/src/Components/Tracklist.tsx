import Track from './Track'
import { ITrack } from '../interfaces'

interface TracklistProps {
  tracks: ITrack[]
  emptyState: string
  inPlaylist: boolean
  handlePlaylistAction: (track: ITrack) => void
}

const Tracklist = ({
  tracks = [],
  emptyState,
  inPlaylist,
  handlePlaylistAction,
}: TracklistProps) => {

  return (
    <div>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track) => (
            <Track
              key={track.id}
              track={track}
              trackBtnAction={inPlaylist ? 'Remove from' : 'Add to'}
              onClick={handlePlaylistAction}
              inPlaylist={inPlaylist}
            />
          ))}
        </ul>
      ): (
        <h2>{emptyState}</h2>
      )}
    </div>
  )
}

export default Tracklist
