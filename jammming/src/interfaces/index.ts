interface IArtist {
  name: string;
}

interface IAlbum {
  name: string;
  images: {
    url: string;
  }[];
}

export interface ITrack {
  id: string;
  name: string;
  artists: IArtist[];
  album: IAlbum;
  preview_url: string;
  explicit: boolean;
  uri: string;
}

export interface ISpotifyTrack {
  id: string;
  name: string;
  artists: IArtist[];
  album: IAlbum;
  preview_url: string;
  explicit: boolean;
  uri: string;
}