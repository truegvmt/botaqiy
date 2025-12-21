import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import TextInput from "./pages/TextInput";
import FlashcardReview from "./pages/FlashcardReview";
import ScenarioMode from "./pages/ScenarioMode";
import ScenarioTest from "./pages/ScenarioTest";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
            <Route path="text-input" element={<TextInput />} />
            <Route path="flashcard-review/:sessionId" element={<FlashcardReview />} />
            <Route path="scenario-mode" element={<ScenarioMode />} />
            <Route path="scenario-test/:scenarioId" element={<ScenarioTest />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
