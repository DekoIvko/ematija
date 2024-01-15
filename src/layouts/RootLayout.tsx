import { ErrorFallback, Header } from "../components";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { useUserAuthContext } from "../context/UserAuthContext";

const RootLayout = () => {
  const user = useUserAuthContext();
  return (
    <div className="root-layout bg-gray-600">
      {user.user && <Header />}
      <main className="pt-16 min-h-[calc(100vh)]">
        <Toaster />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet /> {/* render all pages here */}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
