import { ErrorFallback, Header } from "../components";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import AuthProvider from "../hooks/AuthProvider";
import { ErrorBoundary } from "react-error-boundary";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Header />
      <main>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <AuthProvider>
            <Outlet /> {/* render all pages here */}
          </AuthProvider>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
