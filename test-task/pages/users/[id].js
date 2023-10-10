import styles from '../../styles/main.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const handleClickBtn = (route) => {
    router.push(route);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTimestamp) {
        handleClickBtn('/login');
        localStorage.setItem('token', '')
      }

      if (decoded.email !== window.location.pathname.split('/').reverse()[0]) {
        handleClickBtn('/login');
      }

    } catch {
      handleClickBtn('/login');
    }

  }, []);

  return (
    <>
      <main className={`${styles.main} px-[30px]`}>
        <nav className='text-[10px]'>
          Главная / Настройки аккаунта / Загрузка аватара
        </nav>
        <div className='mb-[37px] mt-[21px] pl-[10px] text-2xl font-bold'>
          Загрузка аватара
        </div>
        <span className='max-w-[252px] text-sm'>
          Загрузите файл размером до 5Мб По формату: JPG, PNG, GIF
        </span>
        <button
          className={`
          relative mt-[43px] from-[#686DE0] to-[#4834D4]
          before:left-[100px]
          before:mr-[7px]
          before:bg-[url(../public/open.svg)]
          before:bg-contain
          before:bg-center
          before:bg-no-repeat
          before:p-[7px]`}
          onClick={() => handleClickBtn('/registration')}
        >
          Выбрать файл
        </button>
      </main>
    </>
  );
}
