import React from 'react';
import Link from 'next/link';


interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <header>
            <img src="/images/logo.png" alt="Logo" width={120} height={40} />
            <Link href="/">Home</Link> 
            <Link href="/">Mens</Link>
            <Link href="/">Womens</Link>
            <Link href="/">Jewelery</Link>
            <Link href="/">Electronics</Link>
            <Link href="/ProductCart">Cart</Link>
            <Link href="/wishlist">♥</Link>
        </header>
    );
};

export default Header;