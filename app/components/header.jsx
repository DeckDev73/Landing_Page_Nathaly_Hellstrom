import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo_2.svg';
import styles from '@/app/components/header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.headerLeft}></div>
        <div className={styles.headerCenter}>
            <div className={styles.logo}>
                <Link href="/" aria-label="Ir al inicio">
                    <Image 
                        src={logo} 
                        alt="Logo" 
                        width={50}  
                        height={50}  
                        priority
                        className={styles.logoImg}
                    />
                </Link>
            </div>
        </div>
        <nav className={styles.headerRight}>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Projects</a></li>
                <li><a href='#'>Contact</a></li>
            </ul>
        </nav>
        
    </header>
  );
}