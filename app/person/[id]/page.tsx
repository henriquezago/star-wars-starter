import Link from "next/link";

import Card from "@/app/components/Card";
import HorizontalDivider from "@/app/components/HorizontalDivider";
import Button from "@/app/components/Button";
import MovieLinks from "./components/MovieLinks";

import styles from "./page.module.scss";

interface PersonPageProps {
  params: { id: string };
}

async function getPersonDetails(personId: string) {
  const response = await fetch(
    `http://127.0.0.1:3000/api/person?id=${personId}`
  );
  return response.json();
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = params;
  const personData: Person = await getPersonDetails(id);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <h1 className={styles.title}>{personData.name}</h1>
        <div className={styles.infoWrapper}>
          <section className={styles.details}>
            <h2 className={styles.subtitle}>Details</h2>
            <HorizontalDivider />
            <div className={styles.information}>
              <span>Birth Year: {personData.birth_year}</span>
              <span>Gender: {personData.gender}</span>
              <span>Eye Color: {personData.eye_color}</span>
              <span>Hair Color: {personData.hair_color}</span>
              <span>Height: {personData.height}</span>
              <span>Mass: {personData.mass}</span>
            </div>
          </section>
          <section className={styles.details}>
            <h2 className={styles.subtitle}>Movies</h2>
            <HorizontalDivider />
            <div className={styles.information}>
              {/* @ts-expect-error Server Component */}
              <MovieLinks movieUrls={personData.films} />
            </div>
          </section>
        </div>
        <Button className={styles.backButton}>
          <Link href="/">Back to search</Link>
        </Button>
      </Card>
    </div>
  );
}
