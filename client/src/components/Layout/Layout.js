import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title,
  description,
  keywords,
  author,
  viewport,
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content={viewport} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "72vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce - shop Now",
  description: "MERN Stack Project",
  keywords: "mern, react, node, mongodb",
  author: "Swapnanil Roy",
};

export default Layout;
