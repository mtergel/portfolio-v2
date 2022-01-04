import Image from "next/image";
import useSWR from "swr";

interface CurrentPlayingProps {}

type Spotify = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

const CurrentPlaying: React.FC<CurrentPlayingProps> = () => {
  const fetcher = (url: string) =>
    fetch(url).then((r) => r.json() as Promise<Spotify>);
  const { data } = useSWR("/api/spotify", fetcher);
  if (data) {
    if (data.isPlaying) {
      return (
        <div className="flex items-center flex-col px-4 justify-center mb-4 ">
          <p className="text-gray-400 mb-2 text-sm">Currently playing</p>
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-md w-full p-4 rounded-lg border flex items-start border-gray-700 gap-4 hover:bg-gray-900"
          >
            {/* eslint-disable-next-line */}
            <img
              src={data.albumImageUrl}
              alt={data.album}
              height={112}
              width={112}
              className="rounded-lg"
            />
            <div className="space-y-2 flex-grow">
              <p className="font-bold">{data.title}</p>
              <p className="text-gray-300">{data.artist}</p>
              <p className="text-sm text-gray-400">{data.album}</p>
            </div>
            <svg className="h-5 w-5" viewBox="0 0 168 168">
              <path
                fill="#1ED760"
                d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
              ></path>
            </svg>
          </a>
        </div>
      );
    } else {
      return (
        <div className="flex items-center px-4 justify-center mb-4 ">
          <a
            href={"https://open.spotify.com/user/megurinaluka1"}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-xs w-full px-4 py-6 rounded-lg border flex items-start border-gray-700 gap-4 hover:bg-gray-900"
          >
            <div className="space-y-2 flex-grow">
              <p className="font-bold">Not playing</p>
            </div>
            <svg className="h-5 w-5" viewBox="0 0 168 168">
              <path
                fill="#1ED760"
                d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
              ></path>
            </svg>
          </a>
        </div>
      );
    }
  }

  return <></>;
};

export default CurrentPlaying;
