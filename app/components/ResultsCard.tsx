import Button from "./Button";
import Card from "./Card";
import HorizontalDivider from "./HorizontalDivider";
import styles from "./ResultsCard.module.scss";
import Link from "next/link";

interface ResultsCardProps {
  results: any[];
  isLoading: boolean;
}

interface ResultListItemProps {
  results: any[];
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <h3>
        There are zero matches.
        <br />
        Use the form to search for People or Movies.
      </h3>
    </div>
  );
}

function ResultListItems({ results }: ResultListItemProps) {
  return (
    <ul>
      {results.map((result) => {
        const personId = result.url.split("/")[5];
        const link = `/person/${personId}`;

        return (
          <li key={result.name} className={styles.listItem}>
            <span>{result.name}</span>
            <Button>
              <Link href={link}>See details</Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default function ResultsCard({ results, isLoading }: ResultsCardProps) {
  const content =
    results.length === 0 ? (
      <EmptyState />
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
