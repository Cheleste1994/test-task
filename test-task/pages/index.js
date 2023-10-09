import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Inter } from 'next/font/google';
import styles from '../styles/main.module.scss';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const handleClickBtn = (route) => {
    router.push(route);
  }

  return (
    <>
      <Header />
      <main className={`${styles.main} px-[30px]`}>
        <div className='pl-[10px] text-2xl font-bold'>Выберите действие</div>
        <button className='mt-[80px] from-[#FF8412] to-[#FFC543]' onClick={() => handleClickBtn('login')}>
          Login
        </button>
        <button className='mt-[20px] from-[#686DE0] to-[#4834D4]' onClick={() => handleClickBtn('registration')}>
          Registration
        </button>
      </main>
      <Footer />
    </>
  );
}
