import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../context/user.context";
import { cartContext } from "../../context/Cart.context";

export default function Navbar() {
    const { token, setToken, logOut } = useContext(userContext);
    const { getCartItems, cartInfo } = useContext(cartContext);

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <>
            <nav className="p-4 bg-slate-200 fixed left-0 right-0 z-50">
                <div className="container flex gap-8">
                    <h1>
                        <a href="">
                            <img src={logo} alt="" />
                        </a>
                    </h1>

                    {token ? (
                        <ul className="flex items-center gap-6">
                            <li>
                                <NavLink
                                    className={({ isActive }) => {
                                        return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                            }`;
                                    }}
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) => {
                                        return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                            }`;
                                    }}
                                    to="/products"
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) => {
                                        return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                            }`;
                                    }}
                                    to="/categories"
                                >
                                    Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) => {
                                        return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                            }`;
                                    }}
                                    to="/brands"
                                >
                                    Brands
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) => {
                                        return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                            }`;
                                    }}
                                    to="/allorders"
                                >
                                    Orders
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        ""
                    )}


                    <ul className="flex items-center gap-6 ms-auto">
                        {token ? (

                            <Link to={"/cart"} className="ms-auto relative">
                                <i className="fa-solid fa-cart-shopping text-lg"></i>
                                <span className="bg-primary absolute w-4 h-4 text-sm font-semibold text-white flex justify-center items-center rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                    {cartInfo == null ? (
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                        cartInfo.numOfCartItems || 0
                                    )}
                                </span>
                            </Link>
                        ):''}

                        <li>
                            <NavLink to="https://www.facebook.com">
                                <i className="fa-brands fa-facebook"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="https://www.twitter.com">
                                <i className="fa-brands fa-twitter"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="https://www.tiktok.com">
                                <i className="fa-brands fa-tiktok"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="https://www.youtube.com">
                                <i className="fa-brands fa-youtube"></i>
                            </NavLink>
                        </li>

                        {!token ? (
                            <>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => {
                                            return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                                }`;
                                        }}
                                        to="/auth/login"
                                    >
                                        login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => {
                                            return `relative hover:before:w-full before:transation-[width] before:duration-300 before:h-[2px] before:absolute before:bg-primary before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"
                                                }`;
                                        }}
                                        to="/auth/signup"
                                    >
                                        sign up
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <span className="cursor-pointer" onClick={logOut}>
                                    <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                                </span>
                            </li>
                        )}
                    </ul>

                </div>
            </nav>
        </>
    );
}
