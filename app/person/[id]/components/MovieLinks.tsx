import Link from "next/link";

interface MovieLinkProps {
  movieUrls: string[];
}

async function getMovieDetails(movieUrls: string[]) {
  const requests = movieUrls.map((url) => fetch(url));
  const responses = await Promise.all(requests);
  return Promise.all(responses.map((response) => response.json()));
}

export default async function MovieLinks({ movieUrls }: MovieLinkProps) {
  const movies: Movie[] = await getMovieDetails(movieUrls);
  const getMovieId = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  return (
    <div>
      {movies.map((movie, index) => (
        <span key={movie.episode_id}>
          <Link href={`/movies/${getMovieId(movie.url)}`}>{movie.title}</Link>
          {index < movieUrls.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}
