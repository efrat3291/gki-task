"use client";

import { useWishlistStore } from "@/store/wishListStore";
import { useCartStore } from "@/store/cartStore";
import styles from "./wishList.module.css";

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  if (items.length === 0)
    return <p className={styles.empty}>Your wishlist is empty.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Wishlist</h1>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>

            <div className={styles.buttons}>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button onClick={() => toggleWishlist(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
