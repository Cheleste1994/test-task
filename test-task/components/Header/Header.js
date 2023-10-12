import { fetcher } from '@/pages/api/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { redirectTo } from '../helpers/redirectTo';

export default function Header() {
  const router = useRouter();

  const { data } = useSWR(`account/image`, fetcher, {
    revalidateOnMount: true,
  });

  return (
    <header className='flex h-20 flex-nowrap items-center justify-between px-[30px]'>
      <div className='flex flex-nowrap items-center gap-1 font-bold text-[#4D6AE4]'>
        <Image src='/coins.png' width={30} height={47} alt='coins' />
        CoinsFill
      </div>
      <div className='flex flex-nowrap items-center gap-1' >
        <Image
          src='/search.svg'
          width={20}
          height={20}
          alt='search'
          className='pt-[5px]'
        />
        <Image
          src={`${data?.image || '/avatar.png'}`}
          className='rounded-full'
          width={24}
          height={24}
          alt='avatar'
          onClick={() => {
            localStorage.setItem('token', '')
            redirectTo(router, '/')
          }}
        />
      </div>
    </header>
  );
}
