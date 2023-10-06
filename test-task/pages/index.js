import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <header className='flex h-20 flex-nowrap justify-between'>
        <div>icon</div>
        <div>avatar</div>
      </header>
      <main className='grow'>
        <div>Выберите действие</div>
        <div>Login</div>
        <div>Registration</div>
      </main>
      <footer className='flex h-20 flex-nowrap justify-evenly whitespace-nowrap'>
        <div className='flex flex-col items-center justify-evenly'>
          <Image src='/home.svg' width={26} height={24} alt='home' />
          ראשי
        </div>
        <div className='flex flex-col items-center justify-evenly'>
          <Image src='/credit.svg' width={21} height={17} alt='credit' />
          מפות
        </div>
        <div className='flex flex-col items-center justify-evenly'>
          <Image src='/transfers.svg' width={14} height={19} alt='transfers' />
          תרגומים
        </div>
        <div className='flex flex-col items-center justify-evenly'>
          <Image
            src='/fundraising.svg'
            width={22}
            height={20}
            alt='fundraising'
          />
          גיוס כספים
        </div>
      </footer>
    </>
  );
}
