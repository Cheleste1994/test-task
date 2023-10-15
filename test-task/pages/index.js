import styles from '../styles/main.module.scss';
import { useRouter } from 'next/router';
import { redirectTo } from '@/components/helpers/redirectTo';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main className={`${styles.main} px-[30px]`}>
        <div className='pl-[10px] text-2xl font-bold'>Выберите действие</div>
        <button
          className='mt-[80px] from-[#FF8412] to-[#FFC543]'
          onClick={() => redirectTo(router, 'login')}
        >
          Login
        </button>
        <button
          className='mt-[20px] from-[#686DE0] to-[#4834D4]'
          onClick={() => redirectTo(router, 'registration')}
        >
          Registration
        </button>
      </main>
    </>
  );
}
