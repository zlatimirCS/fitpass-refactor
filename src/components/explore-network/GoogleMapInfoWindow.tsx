'use client';
// import { useRouter } from "next/navigation";
import { routeTranslations } from '@/lib/routeTranslations';
import * as NProgress from 'nprogress';

interface Marker {
  photos?: Array<{ url?: { medium?: string } }>;
  slug?: string;
  name?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
  };
}

interface GoogleMapInfoWindowProps {
  marker: Marker;
  locale: string;
}

const GoogleMapInfoWindow = ({ marker, locale }: GoogleMapInfoWindowProps) => {
  // const router = useRouter();
  const featuredImage =
    marker?.photos?.[0]?.url?.medium || '/images/placeholder.jpg';

  const constructRedirectUrl = (localeParam: string) => {
    const initialMarkerSlug = marker?.slug?.includes('explore-network')
      ? marker?.slug?.split('/')[2]
      : marker.slug;
    const markerSlug =
      localeParam === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
        ? `/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}/${initialMarkerSlug}`
        : `/explore-network/${initialMarkerSlug}`;
    return markerSlug;
  };

  const redirectToSingleVenueDetail = () => {
    // if there is class fixed on the body remove it
    if (document.body.classList.contains('fixed')) {
      document.body.classList.remove('fixed');
    }
    const routerSlug = constructRedirectUrl(locale);
    const url = `/${locale}/${routerSlug}`;
    NProgress.start();
    // router.push(`/${locale}/${routerSlug}`);
    window.location.href = url;
  };
  return (
    <div className='google-map-info-window'>
      <div
        className='google-map-info-window__image'
        style={{ backgroundImage: `url(${featuredImage})` }}
        onClick={redirectToSingleVenueDetail}
      ></div>
      <div className='google-map-info-window__content'>
        <p onClick={redirectToSingleVenueDetail}>{marker.name}</p>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            color: '#474244',
          }}
        >
          <img
            src='/assets/icons/venue-location-icon.svg'
            alt='location icon'
            className='large'
            style={{
              width: '20px',
              aspectRatio: '2/3',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
          <span style={{ letterSpacing: '1px' }}>
            {marker.address &&
              `${marker.address.street} ${marker.address.number}, ${marker.address.city}`}
          </span>
        </div>
      </div>
    </div>
  );
};
export default GoogleMapInfoWindow;
