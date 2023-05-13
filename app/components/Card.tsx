import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  const cardClasses = [styles.card, className];
  return <div className={cardClasses.join(" ")}>{children}</div>;
}
