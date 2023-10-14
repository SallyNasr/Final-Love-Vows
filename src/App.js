import Home from "./Component/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Registrations/LoginForm";
import SignupForm from "./Registrations/SignupForm"
import FeedbackPage from "./Component/info pages/Feedback";
import TermsAndConditions from "./Component/info pages/TermsNCondition";
import Privacy from "./Component/info pages/privacy";
import Addshop from "./Component/AddShop";
import Allshoppage from "./Component/Shop-components/Allshoppage";
import FavoriteShops from "./Component/Shop-components/FavoriteShops";

import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

// for our own shop
import OurShop  from "./pages/Ourownshop/ourshop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./pages/Ourownshop/shop-context";


function RequireLogin({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = auth.currentUser;

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Welcome to our site. Please log in to access the shops.');
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts.
      unsubscribe();
    };
  }, []);

  return (
    <div className="App" >
      {Home}
      <ShopContextProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Contact-us" element={<FeedbackPage />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/Signup" element={<SignupForm />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sellshop" element={<Addshop />} />

            {/* bride route shop */}
            <Route path="/heels" element={<RequireLogin><Allshoppage type={'heel'} /></RequireLogin>} />
            <Route path="/dresses" element={<RequireLogin><Allshoppage type={'dress'} /></RequireLogin>} />
            <Route path="/bouquet" element={<RequireLogin><Allshoppage type={'bouquet'} /></RequireLogin>} />
            <Route path="/accessories" element={<RequireLogin><Allshoppage type={'accessories'} /> </RequireLogin>} />
            <Route path="/hair & makeup salon" element={<RequireLogin><Allshoppage type={'salon'} /></RequireLogin>} />
            <Route path="/nails" element={<RequireLogin><Allshoppage type={'nails'} /> </RequireLogin>} />

            {/* grooms route shop */}
            <Route path="/outfit" element={<RequireLogin><Allshoppage type={'outfit'} /></RequireLogin>} />
            <Route path="/watch" element={<RequireLogin><Allshoppage type={'watch'} /></RequireLogin>} />
            <Route path="/hair & beard" element={<RequireLogin><Allshoppage type={'hair & beard'} /></RequireLogin>} />
            <Route path="/photographers & videographers" element={<RequireLogin><Allshoppage type={'Photographer-Videographer'} /></RequireLogin>} />
            <Route path="/spa" element={<RequireLogin><Allshoppage type={'spa'} /> </RequireLogin>} />
            <Route path="/favoriteshops" element={<FavoriteShops />} />

            {/* hay la new shop for us */}

            <Route path="/ourshop" element={<OurShop />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App;