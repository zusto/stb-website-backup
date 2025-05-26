import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RDkZg02kAGyRVpyU7OlXBH6BGBra9Tj6M5jSKjqtHpLmn10qkJdmde1NyTsIT0Jl58OyuHWgE9uNAErxLCCXi4C00bGy7j8T4');

export default stripePromise;