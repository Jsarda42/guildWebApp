import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPage from './components/memberProgress/AdminPage';
import UserPage from './components/memberProgress/UserPage';

function App() {
  return (
    <Router>
      <NavBar /> {/* NavBar stays the same for all pages */}

      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {/* Define Routes for different pages */}
        <Routes>
          {/* Homepage route: Hero, About, Features, and Contact */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Features />
              <Contact />
            </>
          } />

          {/* Route for AdminPage and UserPage */}
          <Route path="/admin" element={<AdminPage />} />  {/* Admin panel route */}
          <Route path="/progress" element={<UserPage />} />  {/* User progress route */}
        </Routes>
      </main>

      <Footer /> {/* Footer stays the same for all pages */}
    </Router>
  );
}

export default App;



