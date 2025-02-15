import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://platform-api.sharethis.com/js/sharethis.js#property=66938fa2fc42f30019d91a17&product=image-share-buttons";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  return <>{children}</>;
};

export default Layout;
