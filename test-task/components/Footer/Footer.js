import Image from 'next/image';
import HomeLogo from '../../public/home.svg';
import CreditLogo from '../../public/credit.svg';
import TransfersLogo from '../../public/transfers.svg';
import FundraisingLogo from '../../public/fundraising.svg';

export default function Footer() {
  return (
    <footer className='flex h-20 flex-nowrap justify-evenly whitespace-nowrap py-[10px]'>
      <div className='flex cursor-pointer flex-col items-center justify-between pt-[5px]'>
        <HomeLogo />
        ראשי
      </div>
      <div className='flex cursor-pointer flex-col items-center justify-between pt-[5px]'>
        <CreditLogo />
        מפות
      </div>
      <div className='flex cursor-pointer flex-col items-center justify-between pt-[5px]'>
        <TransfersLogo />
        תרגומים
      </div>
      <div className='flex cursor-pointer flex-col items-center justify-between pt-[5px]'>
        <FundraisingLogo />
        גיוס כספים
      </div>
    </footer>
  );
}
