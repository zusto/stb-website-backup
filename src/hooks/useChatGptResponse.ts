import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Ensure you have a supabase client initialized

interface ChatGptPromptData {
  name: string;
  city: string;
  country: string;
  holidayType: string;
  userDescription?: string;
}

export const useChatGptResponse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPersonalizedDescription = async (promptData: ChatGptPromptData): Promise<string | undefined> => {
    if (!supabase) {
      console.warn('Supabase client is not initialized. Skipping personalized description.');
      setError('Supabase not configured. Personalized description unavailable.');
      return undefined;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('openai-chat', {
        body: promptData,
      });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to invoke OpenAI chat function.');
      }
      
      if (data && data.personalizedDescription) {
        return data.personalizedDescription;
      } else if (data && data.error) {
        console.error('Error from OpenAI chat function:', data.error);
        throw new Error(data.error || 'Received an error from the AI service.');
      } else {
        console.warn('No personalized description or error in function response:', data);
        throw new Error('Unexpected response from AI service.');
      }
    } catch (e: any) {
      console.error('Error fetching personalized description:', e);
      setError(e.message || 'An unexpected error occurred.');
      return undefined; // Fallback to static description
    } finally {
      setIsLoading(false);
    }
  };

  return { getPersonalizedDescription, isLoading, error };
};
