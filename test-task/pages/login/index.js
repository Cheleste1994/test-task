import styles from '../../styles/main.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { authorizationUser } from '../api/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const handleClickClosed = (route) => {
    router.push(route);
  };

  const handleClickSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !checkbox) return;

    try {
      const data = await authorizationUser({ method: 'login', email, password });
      if (data.ok) {
        localStorage.setItem('token', data.token)

        router.push(`/users/${email}`);
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`min-h-screen bg-[url(/back.svg)] bg-cover`}>
      <main
        className={`${styles.main} mx-[30px] mt-[47px] min-h-[590px] py-[60px] justify-between rounded-[35px] bg-gradient-to-b from-[#4936D4] to-[#6835D4] text-white`}
      >
        <div className={styles.closed} onClick={() => handleClickClosed('/')}>
          <span />
          <span />
        </div>
        <div className='text-center text-2xl font-bold'>Логин</div>
        <form
          className={`${styles.login} mt-[53px] mx-[40px] flex flex-col`}
          id='login__form'
          onSubmit={handleClickSubmit}
        >
          <label htmlFor='email'>Ваше телефон</label>
          <input
            type='email'
            id='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
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
