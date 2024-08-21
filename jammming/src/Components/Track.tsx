import { BiPlus, BiMinus } from 'react-icons/bi'
import { BsExplicitFill } from 'react-icons/bs'
import { ITrack } from '../interfaces'

interface TrackProps {
  track: ITrack
  trackBtnAction: string
  onClick: (track: ITrack) => void
  inPlaylist?: boolean
}

const Track = ({ track, trackBtnAction, onClick, inPlaylist }: TrackProps) => {

  const handleAction = () => {
    onClick(track)
  }

  return (
    <div className="track m-2 p-3">
      <div className="albumCover">
        <img
          src={track.album.images[0].url}
          alt={track.album.name}
          className="w-16"
        />
      </div>
      <div className="trackInfo flex flex-col">
        <h2>{track.name}</h2>
        <p>
          {track.artists.map((artist) => artist.name).join(', ')} |{' '}
          {track.album.name}
        </p>
      </div>
      <div className="trackControls flex items-center gap-4">
        <audio src={track.preview_url} controls />
        <p>{track.explicit && <BsExplicitFill />}</p>
      </div>
      <div className="trackButton flex justify-center">
        <button
          onClick={handleAction}
          aria-label={`${trackBtnAction} Playlist`}
          title={`${trackBtnAction} Playlist`}
        >
          {trackBtnAction === 'Add to' ? <BiPlus /> : <BiMinus />}
        </button>
      </div>
    </div>
  )
}

export default Track
