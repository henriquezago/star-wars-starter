import Button from "./Button";
import Card from "./Card";
import HorizontalDivider from "./HorizontalDivider";
import styles from "./ResultsCard.module.scss";
import Link from "next/link";

export type Result = Person | Movie;

interface ResultsCardProps {
  results: Result[];
  isLoading: boolean;
}

interface ResultListItemProps {
  results: Result[];
}

interface EmptyState {
  isLoading: boolean;
}

function EmptyState({ isLoading }: EmptyState) {
  const content = isLoading ? (
    <h3>Searching...</h3>
  ) : (
    <h3>
      There are zero matches.
      <br />
      Use the form to search for People or Movies.
    </h3>
  );

  return <div className={styles.emptyState}>{content}</div>;
}

function ResultListItems({ results }: ResultListItemProps) {
  const getName = (result: Result): string => {
    if ("title" in result) {
      return result.title;
    }
    return result.name;
  };

  const getLink = (result: Result): string => {
    const id = result.url.split("/")[5];
    if ("title" in result) {
      return `/movies/${id}`;
    }

    return `/person/${id}`;
  };

  return (
    <>
      {results.map((result) => {
        return (
          <li key={getName(result)} className={styles.listItem}>
            <span>{getName(result)}</span>
            <Button>
              <Link href={getLink(result)}>See details</Link>
            </Button>
          </li>
        );
      })}
    </>
  );
}

export default function ResultsCard({ results, isLoading }: ResultsCardProps) {
  const content =
    results.length === 0 ? (
      <EmptyState isLoading={isLoading} />
    ) : (
      <ul className={styles.resultsList}>
        <ResultListItems results={results} />
      </ul>
    );

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Results</h2>
      <HorizontalDivider />
      {content}
    </Card>
  );
}
