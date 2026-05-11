import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DirectoryHome from "./pages/DirectoryHome";
import Directory from "./pages/Directory";
import MemberProfile from "./pages/MemberProfile";
import JoinDirectory from "./pages/JoinDirectory";
import AdminDirectory from "./pages/AdminDirectory";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DirectoryHome />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/directory/:id" element={<MemberProfile />} />
          <Route path="/join-directory" element={<JoinDirectory />} />
          <Route path="/admin/directory" element={<AdminDirectory />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
