import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <div className='bg-slate-850'>
      <nav className='container mx-auto flex justify-between items-center p-2 text-white'>
        <div className='flex items-center space-x-6'>
          <NavigationLink href='/'>{t('home')}</NavigationLink>
          <NavigationLink href='/about'>{t('pathnames')}</NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
