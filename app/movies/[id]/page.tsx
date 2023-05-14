import Link from "next/link";

import Card from "@/app/components/Card";
import HorizontalDivider from "@/app/components/HorizontalDivider";
import Button from "@/app/components/Button";

import styles from "../../person/[id]/page.module.scss";
import CharacterLinks from "./components/CharacterLinks";

interface MoviePageProps {
  params: { id: string };
}

async function getMovieDetails(movieId: string) {
  const response = await fetch(`http://127.0.0.1:3000/api/movie?id=${movieId}`);
  return response.json();
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = params;
  const movieData: Movie = await getMovieDetails(id);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <h1 className={styles.title}>{movieData.title}</h1>
        <div className={styles.infoWrapper}>
          <section className={styles.details}>
            <h2 className={styles.subtitle}>Opening Crawl</h2>
            <HorizontalDivider />
            <pre className={styles.openingCrawl}>{movieData.opening_crawl}</pre>
          </section>
          <section className={styles.details}>
            <h2 className={styles.subtitle}>Characters</h2>
            <HorizontalDivider />
            {/* @ts-expect-error Server Component */}
            <CharacterLinks characterUrls={movieData.characters} />
          </section>
        </div>
        <Button className={styles.backButton}>
          <Link href="/">Back to search</Link>
        </Button>
      </Card>
    </div>
  );
}
