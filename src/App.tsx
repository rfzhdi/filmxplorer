import { Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Login from './pages/Login';
import ErrorFallback from './components/ErrorFallback';
import Loading from './components/Loading';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Watchlist from './pages/Watchlist';

const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </Router>
  );
}

export default App;
