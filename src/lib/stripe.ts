import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51RDkZUP0LVOFlxpYcjZtbrFGiLkA023GnmKyEyT5U65FAAYa3T49DFCjzapXK9SkslRBxvQK0VT7RyWDXYN2Xxas00Zg7Fr240');

export default stripePromise;