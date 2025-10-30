"use client";

import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/categoryStore";

const Header: React.FC = () => {
  const setCategory = useCategoryStore((state) => state.setCategory);
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    router.push("/"); // חוזר לדף הראשי
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="Logo" width={120} height={40} />
      </div>

      <nav className={styles.nav}>
        <button onClick={() => handleCategoryClick("all")}>Home</button>
        <button onClick={() => handleCategoryClick("men's clothing")}>Mens</button>
        <button onClick={() => handleCategoryClick("women's clothing")}>Womens</button>
        <button onClick={() => handleCategoryClick("jewelery")}>Jewelery</button>
        <button onClick={() => handleCategoryClick("electronics")}>Electronics</button>

        <Link href="/checkout">Cart</Link>
        <Link href="/wishlist">♥</Link>
      </nav>
    </header>
  );
};

export default Header;
