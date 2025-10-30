"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import styles from './FloatingCart.module.css';

interface FloatingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingCart({ isOpen, onClose }: FloatingCartProps) {
  const router = useRouter();
  const { items, removeFromCart, increaseQty, decreaseQty } = useCartStore();
  
  const handleCheckout = () => {
    onClose();
    router.push('/checkout'); 
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={onClose}
      />
      <div className={`${styles.cart} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping Cart ({items.length})</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemPrice}>${item.price}</p>
                <div className={styles.itemControls}>
                  <button 
                    className={styles.quantityButton}
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className={styles.quantityButton}
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className={styles.checkout} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}