import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import ScrollToTop from "./components//ScrollToTop";
import Loader from "./components/Loader";
import PageTransition from "./pages/PageTransition";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedPage";
import { Breadcrumbs } from "./components/ui/Breadcrumb";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartDrawer from "./components/cart/CartDrawer";
import VendorHeader from "./layouts/VendorHeader";
// lazy pages
const Category = lazy(() => import("./pages/Category"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Products = lazy(() => import("./pages/Products"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const LoginOTP = lazy(() => import("./pages/LoginOTP"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ForgetPasswordOTP = lazy(() => import("./pages/ForgetPasswordOTP"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const [headerVisiable, setHeaderVisiable] = useState<boolean>(false);
  // call the current user
  const { data, isLoading } = useAuth().currentUser(true);
  const location = useLocation();
  // header show and hide on top scroll
  useEffect(() => {
    let previousScrollPosition = window.pageYOffset;
    const handleScroll = () => {
      let currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition > currentScrollPosition) {
        setHeaderVisiable(false);
      } else {
        setHeaderVisiable(true);
      }
      previousScrollPosition = currentScrollPosition;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerVisiable]);
  // generateBreadcrumbs
  const generatedBreadcrumbs = useMemo(() => {
    const segments = location.pathname?.split("/").filter(Boolean);
    const items = [{ label: "Home", href: "/" }];
    let accumulatedPath = "";
    segments.forEach((segment: string) => {
      accumulatedPath += `/${segment}`;
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: accumulatedPath,
      });
    });
    return items;
  }, [location.pathname]);
  return (
    <>
      <CartDrawer />
      {/* header  */}
      <header
        className={`${
          headerVisiable ? "-translate-y-full " : "translate-y-0"
        } lg:px-[6rem] sm:px-[1rem] px-[1rem] bg-[#173334] transition-all duration-150 py-2 flex flex-col gap-1.5 justify-center fixed left-0 w-full z-40`}
      >
        {data && data?.role === "vendor" ? <VendorHeader /> : <Header />}
      </header>
      {/* main  */}
      <main className="overflow-hidden flex flex-col gap-5 pb-5">
        <ScrollToTop />
        {location.pathname !== "/" && (
          <Breadcrumbs items={generatedBreadcrumbs} maxItems={4} />
        )}
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader style="h-screen" />}>
            <Routes location={location} key={location.pathname}>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <PageTransition variants="fade">
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/register"
                element={
                  <PageTransition variants="fade">
                    <Register />
                  </PageTransition>
                }
              />
              <Route
                path="/login"
                element={
                  <PageTransition variants="fade">
                    <Login />
                  </PageTransition>
                }
              />
              <Route
                path="/forget-password"
                element={
                  <PageTransition variants="fade">
                    <ForgetPassword />
                  </PageTransition>
                }
              />
              <Route
                path="/verify-email"
                element={
                  <PageTransition variants="fade">
                    <VerifyEmail />
                  </PageTransition>
                }
              />
              <Route
                path="/login-otp-verify/:email"
                element={
                  <PageTransition variants="fade">
                    <LoginOTP />
                  </PageTransition>
                }
              />
              <Route
                path="/forget-password-otp-verify/:email"
                element={
                  <PageTransition variants="fade">
                    <ForgetPasswordOTP />
                  </PageTransition>
                }
              />
              <Route
                path="/category"
                element={
                  <PageTransition variants="fade">
                    <Category />
                  </PageTransition>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <PageTransition variants="fade">
                    <ProductDetails />
                  </PageTransition>
                }
              />
              <Route
                path="/products"
                element={
                  <PageTransition variants="fade">
                    <Products />
                  </PageTransition>
                }
              />
              {/* Protected routes */}
              {/* --------------------- only vedor -------------------------  */}
              <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
                <Route
                  path="/create-product"
                  element={
                    <PageTransition variants="fade">
                      <CreateProduct />
                    </PageTransition>
                  }
                ></Route>
              </Route>
              {/* --------------------- only vedor -------------------------  */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={["customer", "vendor"]} />
                }
              >
                <Route
                  path="/profile/:userId"
                  element={
                    <PageTransition variants="fade">
                      <UserProfile />
                    </PageTransition>
                  }
                />
              </Route>
              <Route
                element={
                  <ProtectedRoute allowedRoles={["customer", "vendor"]} />
                }
              >
                <Route
                  path="/wishlist/:userId"
                  element={
                    <PageTransition variants="fade">
                      <Wishlist />
                    </PageTransition>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <footer className="bg-[#173334] py-4">
        <Footer />
      </footer>
      {/* footer  */}
    </>
  );
}
export default App;
