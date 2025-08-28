import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Plane, Calendar, Heart, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SunnyMascot from '@/components/SunnyMascot';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface DestinationData {
  id: number;
  location: string;
  startDate: string;
  endDate: string;
  vibes: string[];
  wishlist: string;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  destinations: DestinationData[];
}

const vibeOptions = [{
  value: 'sun-beach',
  label: 'Sun & Beach 🏖️'
}, {
  value: 'culture-museums',
  label: 'Culture & Museums 🏛️'
}, {
  value: 'foodie-spots',
  label: 'Foodie Spots 🍜'
}, {
  value: 'nature-hiking',
  label: 'Nature & Hiking 🌲'
}, {
  value: 'nightlife',
  label: 'Nightlife 🎶'
}, {
  value: 'budget-hacks',
  label: 'Budget Hacks 💸'
}];

const PlanMyTripPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    destinations: [{
      id: 1,
      location: '',
      startDate: '',
      endDate: '',
      vibes: [],
      wishlist: ''
    }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('My Travel Plan', 20, 30);
    
    // Traveler Info
    doc.setFontSize(14);
    doc.text('Traveler Information:', 20, 50);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.firstName} ${formData.middleName} ${formData.lastName}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    
    // Destinations
    let yPosition = 90;
    formData.destinations.forEach((dest, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(14);
      doc.text(`Destination ${index + 1}:`, 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.text(`Location: ${dest.location}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Dates: ${dest.startDate} to ${dest.endDate}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Vibes: ${dest.vibes.map(v => vibeOptions.find(opt => opt.value === v)?.label).join(', ')}`, 20, yPosition);
      yPosition += 10;
      
      if (dest.wishlist) {
        const wishlistLines = doc.splitTextToSize(`Wishlist: ${dest.wishlist}`, 170);
        doc.text(wishlistLines, 20, yPosition);
        yPosition += wishlistLines.length * 5;
      }
      yPosition += 10;
    });
    
    doc.save('my-travel-plan.pdf');
  };

  const addDestination = () => {
    const newId = Math.max(...formData.destinations.map(d => d.id)) + 1;
    setFormData(prev => ({
      ...prev,
      destinations: [...prev.destinations, {
        id: newId,
        location: '',
        startDate: '',
        endDate: '',
        vibes: [],
        wishlist: ''
      }]
    }));
  };

  const removeDestination = (id: number) => {
    if (formData.destinations.length > 1) {
      setFormData(prev => ({
        ...prev,
        destinations: prev.destinations.filter(d => d.id !== id)
      }));
    }
  };

  const updateDestination = (id: number, field: keyof DestinationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.map(dest => dest.id === id ? {
        ...dest,
        [field]: value
      } : dest)
    }));
  };

  const toggleVibe = (destId: number, vibe: string) => {
    const destination = formData.destinations.find(d => d.id === destId);
    if (!destination) return;
    
    const currentVibes = destination.vibes;
    let newVibes;
    if (currentVibes.includes(vibe)) {
      newVibes = currentVibes.filter(v => v !== vibe);
    } else {
      newVibes = [...currentVibes, vibe];
    }
    updateDestination(destId, 'vibes', newVibes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const hasValidDestination = formData.destinations.some(dest => 
      dest.location && dest.startDate && dest.endDate
    );

    if (!hasValidDestination) {
      toast({
        title: "Missing Destination Info",
        description: "Please add at least one destination with location and dates.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Generate PDF
    generatePDF();
    
    // Show success toast
    toast({
      title: "Success! ✨",
      description: "Your travel plan has been created and downloaded!",
    });
    
    // Always show success page after brief delay
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);

    // Background submission (optional)
    try {
      const submitData = new FormData();
      submitData.append('first_name', formData.firstName);
      submitData.append('middle_name', formData.middleName);
      submitData.append('last_name', formData.lastName);
      submitData.append('email', formData.email);

      formData.destinations.forEach((dest, index) => {
        submitData.append(`destination_${index + 1}`, dest.location);
        submitData.append(`start_date_${index + 1}`, dest.startDate);
        submitData.append(`end_date_${index + 1}`, dest.endDate);
        submitData.append(`vibe_${index + 1}`, dest.vibes.join(', '));
        submitData.append(`wishlist_${index + 1}`, dest.wishlist);
      });

      await fetch('https://forms.studenttravelbuddy.com/submit', {
        method: 'POST',
        body: submitData
      });
    } catch (error) {
      console.log('Background submission failed:', error);
    }
  };

  if (submitted) {
    return <div className="min-h-screen bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain text-midnight">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="sunny-card max-w-2xl mx-auto text-center">
            <SunnyMascot size="xl" travelStyle="adventure" className="mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-display text-sunny-orange-dark mb-4">
              ✨ Your epic adventure blueprint is loading... ✨
            </h1>
            <p className="text-lg text-midnight mb-6">
              Thanks for trusting us with your dream adventure! Your travel plan has been downloaded as a PDF, and our travel wizards are crafting your personalized itinerary. We'll email it to you within 48 hours.
            </p>
            <Button 
              onClick={generatePDF}
              className="bg-sunny-gradient text-white font-bold rounded-xl mb-4 flex items-center gap-2 mx-auto"
            >
              <Download className="h-5 w-5" />
              Download Your Travel Plan Again
            </Button>
            <p className="text-sm text-sunny-orange-dark">
              Keep an eye on your inbox (and spam folder, just in case) 📧
            </p>
          </div>
        </div>
        <Footer />
      </div>;
  }

  return <>
      <Navbar />
      <div className="min-h-screen bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain text-midnight">
        <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        
        <div className="relative z-10 px-4 pt-24 pb-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-display text-sunny-orange-dark mb-6 leading-tight">
              Hey bestie! ✈️🌎 One step closer to your BEST trip ever — drop your travel dreams and we'll make magic happen!
            </h1>
            <p className="text-lg md:text-xl text-midnight mb-8">No cap, we're about to craft you the most fire itinerary that'll have your friends asking 'HOW did you find all these spots?!' 🔥🎁 You will receive a personalised student itinerary within 48 hours, packed with hand-picked discounts, events &amp; hotspots that match your vibe.</p>
            <div className="flex justify-center mb-8">
              <SunnyMascot size="lg" travelStyle="fashion" className="sunny-bounce" />
            </div>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="sunny-card space-y-8">
              {/* Traveller Info Section */}
              <div>
                <h2 className="text-2xl font-display text-sunny-orange-dark mb-6 flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  About you
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sunny-orange-dark font-medium">
                      First Name *
                    </Label>
                    <Input id="firstName" name="first_name" value={formData.firstName} onChange={e => setFormData(prev => ({
                    ...prev,
                    firstName: e.target.value
                  }))} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                  </div>
                  <div>
                    <Label htmlFor="middleName" className="text-sunny-orange-dark font-medium">
                      Middle Name
                    </Label>
                    <Input id="middleName" name="middle_name" value={formData.middleName} onChange={e => setFormData(prev => ({
                    ...prev,
                    middleName: e.target.value
                  }))} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sunny-orange-dark font-medium">
                      Last Name *
                    </Label>
                    <Input id="lastName" name="last_name" value={formData.lastName} onChange={e => setFormData(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sunny-orange-dark font-medium">
                      Best Email *
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                  </div>
                </div>
              </div>

              {/* Destinations Section */}
              <div>
                <h2 className="text-2xl font-display text-sunny-orange-dark mb-6 flex items-center gap-2">
                  <Plane className="h-6 w-6" />
                  Where are you planning to travel this year?
                </h2>
                
                <div id="destinations" className="space-y-8">
                  {formData.destinations.map((destination, index) => <div key={destination.id} className="sunny-card bg-sunny-yellow-pale border border-sunny-orange-light/30 relative">
                      {formData.destinations.length > 1 && <button type="button" onClick={() => removeDestination(destination.id)} className="absolute top-4 right-4 p-2 text-sunny-orange-dark hover:text-sunny-orange rounded-full hover:bg-white/50 transition-colors">
                          <X className="h-4 w-4" />
                        </button>}
                      
                      <h3 className="text-lg font-display text-sunny-orange-dark mb-4">
                        Destination {index + 1}
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Location */}
                        <div>
                          <Label htmlFor={`location-${destination.id}`} className="text-sunny-orange-dark font-medium">
                            Where to? *
                          </Label>
                          <Input id={`location-${destination.id}`} name={`destination_${index + 1}`} value={destination.location} onChange={e => updateDestination(destination.id, 'location', e.target.value)} placeholder="e.g., Tokyo, Japan or Bali, Indonesia" className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`startDate-${destination.id}`} className="text-sunny-orange-dark font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Start Date *
                            </Label>
                            <Input id={`startDate-${destination.id}`} name={`start_date_${index + 1}`} type="date" value={destination.startDate} onChange={e => updateDestination(destination.id, 'startDate', e.target.value)} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                          </div>
                          <div>
                            <Label htmlFor={`endDate-${destination.id}`} className="text-sunny-orange-dark font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              End Date *
                            </Label>
                            <Input id={`endDate-${destination.id}`} name={`end_date_${index + 1}`} type="date" value={destination.endDate} onChange={e => updateDestination(destination.id, 'endDate', e.target.value)} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange" required />
                          </div>
                        </div>

                        {/* Vibe Check */}
                        <div>
                          <Label className="text-sunny-orange-dark font-medium mb-3 block">
                            What kind of experience are you looking for? (Choose all that apply)
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {vibeOptions.map(vibe => <button key={vibe.value} type="button" onClick={() => toggleVibe(destination.id, vibe.value)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${destination.vibes.includes(vibe.value) ? 'border-sunny-orange bg-sunny-orange text-white' : 'border-sunny-orange-light/50 bg-white hover:border-sunny-orange-light hover:bg-sunny-yellow-pale'}`}>
                                {vibe.label}
                              </button>)}
                          </div>
                        </div>

                        {/* Wishlist */}
                        <div>
                          <Label htmlFor={`wishlist-${destination.id}`} className="text-sunny-orange-dark font-medium">
                            Your wishlist & must-dos
                          </Label>
                          <Textarea id={`wishlist-${destination.id}`} name={`wishlist_${index + 1}`} value={destination.wishlist} onChange={e => updateDestination(destination.id, 'wishlist', e.target.value)} placeholder="e.g., Try authentic ramen, visit temples, experience nightlife, find best Instagram spots..." rows={3} className="rounded-xl border-sunny-orange-light/50 focus-visible:ring-sunny-orange resize-none" />
                        </div>
                      </div>
                    </div>)}
                </div>

                <Button type="button" onClick={addDestination} className="w-full mt-6 bg-sunny-yellow hover:bg-sunny-yellow-light text-sunny-orange-dark font-bold rounded-xl flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add another destination ✈️
                </Button>
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-sunny-gradient text-white font-bold text-lg py-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Crafting your adventure...' : '✨ Get My Custom Itinerary'}
                </Button>
                
                <p className="text-sm text-center text-sunny-orange-dark">
                  Sunny & team value privacy. We'll use your details solely to craft your itinerary and email it back – pinky promise. 💌
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>;
};

export default PlanMyTripPage;
