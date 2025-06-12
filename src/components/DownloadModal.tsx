import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackEvent as trackGAEvent } from '@/utils/analytics';
import { trackEvent as trackPixelEvent } from '@/utils/metaPixel';
import axios from 'axios';  // Add this import

const downloadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type DownloadFormData = z.infer<typeof downloadSchema>;

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  driveLink?: string;
}

const DownloadModal = ({ isOpen, onClose, resourceTitle, driveLink }: DownloadModalProps) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
  });

  const onSubmit = async (data: DownloadFormData) => {
    try {
      // Open download link immediately
      if (driveLink) {
        window.open(driveLink, '_blank');
      }

      // Show success message and close modal
      toast({
        title: "Success!",
        description: "Your download is starting. Check your downloads folder.",
        variant: "default"
      });

      // Send data to API
      try {
        await axios.post('https://studenttravelbuddy.com/api/freebies/submit', {
          Full_Name: data.name,
          Email: data.email,
          Resource_Name: resourceTitle,
          Resource_Link: driveLink,
          Download_Date: new Date().toISOString()
        });
      } catch (apiError) {
        // Log error but don't show to user since download already started
        console.error('API submission error:', apiError);
      }

      reset();
      onClose();

      // Track events
      trackGAEvent('Freebie', 'Download', resourceTitle);
      trackPixelEvent('Download', {
        content_name: resourceTitle,
        content_type: 'freebie'
      });

    } catch (error) {
      console.error('Download error:', error);
      // Still allow download even if tracking fails
      if (driveLink) {
        window.open(driveLink, '_blank');
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-sunny-gradient rounded-full flex items-center justify-center">
              <Download className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
            Download "{resourceTitle}"
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Just enter your details below to get instant access to this free resource!
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Your Name
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="h-11 rounded-lg border-gray-200 focus:border-sunny-orange focus:ring-sunny-orange"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className="h-11 rounded-lg border-gray-200 focus:border-sunny-orange focus:ring-sunny-orange"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 rounded-lg border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-lg bg-sunny-gradient hover:opacity-90 text-white font-medium"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;