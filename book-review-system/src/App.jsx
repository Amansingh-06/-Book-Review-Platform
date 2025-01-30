import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Ensure you have this store setup
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import UserProfile from "./pages/UserProfile";
import ReviewForm from "./pages/ReviewForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";

function App() {
  return (
    <Provider store={store}>  {/* Redux Provider Added */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/api/books/:id" element={<BookDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path = '/addbook' element={<AddBookPage/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
