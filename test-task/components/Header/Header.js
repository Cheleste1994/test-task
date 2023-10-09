import Image from 'next/image';

export default function Header() {
  return (
    <header className='flex h-20 flex-nowrap items-center justify-between px-[30px]'>
      <div className='flex flex-nowrap items-center gap-1 font-bold text-[#4D6AE4]'>
        <Image src='/coins.png' width={30} height={47} alt='coins' />
        CoinsFill
      </div>
      <div className='flex flex-nowrap items-center gap-1'>
        <Image src='/search.svg' width={20} height={20} alt='search' className='pt-[5px]'/>
        <Image src='/avatar.png' width={24} height={24} alt='avatar' />
      </div>
    </header>
  );
}
