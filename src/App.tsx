import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
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
import AmbassadorTermsPage from "./pages/AmbassadorTermsPage"; // Add this import
import NotFound from "./pages/NotFound";
import CheckoutDetailsPage from "./pages/checkout/CheckoutDetailsPage";
import CheckoutPaymentPage from "./pages/checkout/CheckoutPaymentPage";
import CheckoutVerifyPage from "./pages/checkout/CheckoutVerifyPage";
import CheckoutUploadDocsPage from "./pages/checkout/CheckoutUploadDocsPage";
import CheckoutConfirmationPage from "./pages/checkout/CheckoutConfirmationPage";
import StudentVerificationConsentPage from "./pages/StudentVerificationConsentPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"; // Added import
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"; // Added import
import PaySuccessPage from './pages/checkout/PaySuccessPage';
import PayCancelPage from './pages/checkout/PayCancelPage';
import { initGA, trackPageView } from './utils/analytics';
import { initPixel } from './utils/metaPixel';
import FreebiesPage from './pages/FreebiesPage';
import Flyer3Page from './pages/Flyer3Page';
import Flyer2Page from "./pages/Flyer2Page";
import FlyerPage from "./pages/FlyerPage";

const queryClient = new QueryClient();

const Homepage = lazy(() => import('./pages/Index'));
const Checkout = lazy(() => import('./pages/checkout/CheckoutDetailsPage'));

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div
        id="page"
        className="min-h-screen w-full overflow-x-hidden
                  bg-fixed bg-radialSunny from-[#FFD447] via-[#FFEFE2] to-white bg-grain
                  text-midnight"
      >
        <Outlet /> {/* Replace Routes with Outlet */}
      </div>
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/sales", element: <SalesPage /> },
      { path: "/funnel", element: <FunnelLandingPage /> },
      { path: "/epic-perks", element: <EpicPerksPage /> },
      { path: "/templates", element: <Templates /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/checkout/details", element: <CheckoutDetailsPage /> },
      { path: "/checkout/payment", element: <CheckoutPaymentPage /> },
      { path: "/checkout/verify", element: <CheckoutVerifyPage /> },
      { path: "/checkout/upload-docs", element: <CheckoutUploadDocsPage /> },
      // Updated Checkout Confirmation Routes
      { path: "/checkout/confirmation/success", element: <CheckoutConfirmationPage /> },
      { path: "/checkout/confirmation/manual", element: <CheckoutConfirmationPage /> },
      { path: "/student-verification-consent", element: <StudentVerificationConsentPage /> },
      { path: "/terms-and-conditions", element: <TermsAndConditionsPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
      // Checkout flow success page
      { path: "/checkout/payment/success", element: <PaySuccessPage /> },
      { path: "/checkout/payment/cancel", element: <PayCancelPage /> },
      // Main payment success page
      { path: "/payment-success", element: <PaymentSuccessPage /> },
      { path: "/payment-cancel", element: <PaymentCancelPage /> },
      { path: "/ambassador-application", element: <AmbassadorApplicationPage /> },
      { path: "/ambassador-terms", element: <AmbassadorTermsPage /> }, // Add this route
      { path: "/freebies", element: <FreebiesPage />},
      { path: "/flyer3", element: <Flyer3Page />},
      { path: "/flyer2", element: <Flyer2Page />},
      { path : "/flyer", element: <FlyerPage />},
      { path: "*", element: <NotFound /> }
    ]
  }
]);

function App() {
  useEffect(() => {
    // Initialize analytics
    initGA();
    initPixel();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
