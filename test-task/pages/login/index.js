import styles from '../../styles/main.module.scss';
import backSvg from '../../public/back.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const handleClickClosed = (route) => {
    router.push(route);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    if (!mobile || !password) return;

    const data = {
      mobile,
      password,
      checkbox,
    };
    console.log(data);
  };

  return (
    <div className={`min-h-screen bg-[url(/back.svg)] bg-cover`}>
      <main
        className={`${styles.main} mx-[30px] mt-[47px] min-h-[590px] justify-around rounded-[35px] bg-gradient-to-b from-[#4936D4] to-[#6835D4] text-white`}
      >
        <div className={styles.closed} onClick={() => handleClickClosed('/')}>
          <span />
          <span />
        </div>
        <div className='text-center text-2xl font-bold'>Логин</div>
        <form
          className={`${styles.login} mx-[40px] flex flex-col`}
          id='login__form'
          onSubmit={handleClickSubmit}
        >
          <label htmlFor='mobile'>Ваше телефон</label>
          <input
            type='tel'
            id='mobile'
            placeholder='+7 961 825 70 55'
            value={mobile}
            onChange={({ target }) => setMobile(target.value)}
          />
          <label htmlFor='password' className='relative'>
            Пароль
            <Image src='./eye.svg' width={15} height={15} alt='eye' className={`z-10 absolute top-[50px] right-[20px]`} />
          </label>
          <input
            type='password'
            name='password'
            placeholder='*********'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Link href='/registration' className='my-[24px] text-xs opacity-75'>
            Забыли пароль?
          </Link>
          <div className='flex flex-nowrap items-start'>
            <input
              id='checkbox'
              type='checkbox'
              className={`hidden`}
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
            <label htmlFor='checkbox' className={styles.checkbox} />
            <span className='ml-[18px] w-full max-w-[237px] text-xs'>
              Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь
              с{' '}
              <Link href='/' className='underline'>
                Условиями Соглашения!
              </Link>{' '}
              Правилами и политикой конфиденциальности компании
            </span>
          </div>
        </form>
        <button
          className='mx-[30px] mt-[80px] from-[#FF8412] to-[#FFC543]'
          form='login__form'
          type='submit'
        >
          Войти
        </button>
      </main>
    </div>
  );
}
