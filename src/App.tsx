import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Index from "./pages/Index";
import SalesPage from "./pages/SalesPage";
import FunnelLandingPage from "./pages/FunnelLandingPage";
import EpicPerksPage from "./pages/EpicPerksPage";
import Templates from "./pages/Templates";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import AmbassadorApplicationPage from "./pages/AmbassadorApplicationPage";
import NotFound from "./pages/NotFound";
import CheckoutDetailsPage from "./pages/checkout/CheckoutDetailsPage";
import CheckoutPaymentPage from "./pages/checkout/CheckoutPaymentPage";
import CheckoutVerifyPage from "./pages/checkout/CheckoutVerifyPage";
import CheckoutUploadDocsPage from "./pages/checkout/CheckoutUploadDocsPage";
import CheckoutConfirmationPage from "./pages/checkout/CheckoutConfirmationPage";
import StudentVerificationConsentPage from "./pages/StudentVerificationConsentPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"; // Added import
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"; // Added import

const queryClient = new QueryClient();

const Homepage = lazy(() => import('./pages/Index'));
const Checkout = lazy(() => import('./pages/checkout/CheckoutDetailsPage'));

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div
        id="page"
        className="min-h-screen w-full overflow-x-hidden
                  bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain
                  text-midnight"
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/funnel" element={<FunnelLandingPage />} />
              <Route path="/epic-perks" element={<EpicPerksPage />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/details" element={<CheckoutDetailsPage />} />
              <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
              <Route path="/checkout/verify" element={<CheckoutVerifyPage />} />
              <Route path="/checkout/upload-docs" element={<CheckoutUploadDocsPage />} />
              {/* Updated Checkout Confirmation Routes */}
              <Route path="/checkout/confirmation/success" element={<CheckoutConfirmationPage />} />
              <Route path="/checkout/confirmation/manual" element={<CheckoutConfirmationPage />} />
              <Route path="/student-verification-consent" element={<StudentVerificationConsentPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              <Route path="/ambassador-application" element={<AmbassadorApplicationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </Suspense>
  );
}

export default App;
