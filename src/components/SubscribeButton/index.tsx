import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if(!session) {
      signIn('github')
      return;
    }

    // create checkout session
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}