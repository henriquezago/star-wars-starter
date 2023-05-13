import Link from "next/link";

interface CharacterLinkProps {
  characterUrls: string[];
}

async function getCharacterDetails(movieUrls: string[]) {
  const requests = movieUrls.map((url) => fetch(url));
  const responses = await Promise.all(requests);
  return Promise.all(responses.map((response) => response.json()));
}

export default async function CharacterLinks({ characterUrls }: CharacterLinkProps) {
  const movies: Person[] = await getCharacterDetails(characterUrls);
  const getCharacterId = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  return (
    <div>
      {movies.map((person, index) => (
        <span key={person.name}>
          <Link href={`/person/${getCharacterId(person.url)}`}>{person.name}</Link>
          {index < characterUrls.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}
