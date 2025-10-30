"use client";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishListStore";
import { Product } from "@/types/product";
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className={styles.card}>
      <button
        onClick={() => toggleWishlist(product)}
        className={styles.wishlistBtn}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.category}>
          {product.category}
        </div>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className={styles.addToCartBtn}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
