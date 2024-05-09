import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { token } from "morgan";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  console.log(cart);
  const categories = useCategory();
  console.log(categories);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(function () {
      toast.success("Logout Successfully");
    }, 3000);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <span className="shop-box">
                {" "}
                <RiShoppingBag3Fill className="shopIcon" />{" "}
              </span>{" "}
              Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <Link to="/categories">
                  <DropdownButton key={"primary"} title={"Categories"}>
                    <Dropdown.Item>
                      <Link to={"/categories"}> All Categories</Link>
                    </Dropdown.Item>
                    {categories
                      ? categories.map((cat, index) => (
                          <Dropdown.Item eventKey={index + 1}>
                            <Link to={`/categoryDestroying/${cat.slug}`}>
                              {" "}
                              {cat.name ? cat.name : null}
                            </Link>
                          </Dropdown.Item>
                        ))
                      : null}
                  </DropdownButton>
                </Link>
              </li>

              {!auth.user ? (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {(auth ? auth.user : null) ? auth.user.name : null}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            ((auth ? auth.user : null)
                              ? auth.user.role
                              : null) === 1
                              ? "admin"
                              : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          href="#"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </li>
              )}
              <li className="nav-item">
                <Badge count={cart ? cart.length : 0}>
                  <NavLink to="/cart" className="nav-link" href="#">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
