import Image from 'next/image';
import HomeLogo from '../../public/home.svg';

export default function Footer() {
  return (
    <footer className='flex h-20 flex-nowrap justify-evenly whitespace-nowrap py-[10px]'>
      <div className='flex flex-col items-center justify-between cursor-pointer'>
        <Image src={HomeLogo} width={26} height={24} alt='home' className='footer__icon grow'/>
        ראשי
      </div>
      <div className='flex flex-col items-center justify-between cursor-pointer'>
        <Image src='/credit.svg' width={21} height={17} alt='credit' className='grow'/>
        מפות
      </div>
      <div className='flex flex-col items-center justify-between cursor-pointer'>
        <Image src='/transfers.svg' width={14} height={19} alt='transfers' className='grow'/>
        תרגומים
      </div>
      <div className='flex flex-col items-center justify-between cursor-pointer'>
        <Image
          src='/fundraising.svg'
          width={22}
          height={20}
          alt='fundraising'
          className='grow'
        />
        גיוס כספים
      </div>
    </footer>
  );
}
