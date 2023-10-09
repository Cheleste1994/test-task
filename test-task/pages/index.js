import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex grow flex-col px-[30px]'>
        <div className='pl-[10px] text-2xl font-bold'>Выберите действие</div>
        <div className='mt-[80px] flex h-[65px] flex-col justify-center bg-gradient-to-br from-[#FF8412] to-[#FFC543] text-center rounded-[50px] text-white'>
          Login
        </div>
        <div className='mt-[20px] flex h-[65px] flex-col justify-center bg-gradient-to-br from-[#686DE0] to-[#4834D4] text-center rounded-[50px] text-white'>
          Registration
        </div>
      </main>
      <Footer />
    </>
  );
}
