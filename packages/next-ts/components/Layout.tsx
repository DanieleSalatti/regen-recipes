import Header from "./Header";
import Footer from "./Footer";
import FaucetModal from "./FaucetModal";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-screen">{children}</div>
      <FaucetModal />
      <Footer />
    </div>
  );
};
export default Layout;
