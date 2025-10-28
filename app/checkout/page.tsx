"use client";

import { useCartStore } from "@/store/cartStore";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  if (items.length === 0)
    return <p className={styles.empty}>Your cart is empty.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.info}>
              <h3>{item.title}</h3>
              <p>${item.price}</p>

              <div className={styles.qty}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>

            <div className={styles.actions}>
              <p>${(item.price * (item.quantity || 1)).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button onClick={clearCart} className={styles.clear}>Clear Cart</button>
        <div className={styles.total}>Total: ${totalPrice.toFixed(2)}</div>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
}
