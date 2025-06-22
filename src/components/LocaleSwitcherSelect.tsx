'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import clsx from 'clsx';
import { Locale } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { ChangeEvent, ReactNode, Suspense, useTransition } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

function LocaleSwitcherSelectInner({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // Preserve search parameters when switching locales
      const searchParamsString = searchParams.toString();
      const url = searchParamsString
        ? `${pathname}?${searchParamsString}`
        : pathname;

      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname: url, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className='sr-only'>{label}</p>
      <select
        className='inline-flex appearance-none bg-transparent py-3 pl-2 pr-6'
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className='pointer-events-none absolute right-2 top-[8px]'>⌄</span>
    </label>
  );
}

export default function LocaleSwitcherSelect(props: Props) {
  return (
    <Suspense
      fallback={
        <div className='inline-flex appearance-none bg-transparent py-3 pl-2 pr-6'>
          ⌄
        </div>
      }
    >
      <LocaleSwitcherSelectInner {...props} />
    </Suspense>
  );
}
