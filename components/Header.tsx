"use client";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useCategoryStore } from "@/store/categoryStore";

const Header: React.FC = () => {
  const setCategory = useCategoryStore((state) => state.setCategory);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="Logo" width={120} height={40} />
      </div>

      <nav className={styles.nav}>
        <button onClick={() => setCategory("all")}>Home</button>
        <button onClick={() => setCategory("men's clothing")}>Mens</button>
        <button onClick={() => setCategory("women's clothing")}>Womens</button>
        <button onClick={() => setCategory("jewelery")}>Jewelery</button>
        <button onClick={() => setCategory("electronics")}>Electronics</button>

        <Link href="/ProductCart">Cart</Link>
        <Link href="/wishlist">♥</Link>
      </nav>
    </header>
  );
};

export default Header;
