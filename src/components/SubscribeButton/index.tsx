import  styles from './styles.module.scss';

interface SubscribeProps {
  priceId: string;
}

export function SubscribeButton({}: SubscribeProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
}