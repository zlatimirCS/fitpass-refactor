import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import GoogleMap from './GoogleMap';
import SidebarVenueCard from './SidebarVenueCard';

interface Venue {
  _id: string;
  name: string;
  address: any;
  rating: number;
  photos: Array<{ url: { medium: string } }>;
  slug: string;
  lat: number;
  lng: number;
}

interface VenueForMap {
  latLng: { lat: number; lng: number };
  slug: string;
  name: string;
  photos: Array<{ url: { medium: string } }>;
  address: any;
}

interface Center {
  lat: number;
  lng: number;
}

interface VenuesMapProps {
  handleCloseModal: () => void;
  venues: Venue[];
  locale: string;
}

const VenuesMap = ({ handleCloseModal, venues, locale }: VenuesMapProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [venuesForMap, setVenuesForMap] = useState<VenueForMap[]>([]);
  const [center, setCenter] = useState<Center | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMarker, setSelectedMarker] = useState(null);

  const calculateCenter = (
    coords: Array<{ lat: number; lng: number }>
  ): Center => {
    const latitudes = coords.map(coord => coord.lat);
    const longitudes = coords.map(coord => coord.lng);
    const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
    return { lat: avgLat, lng: avgLng };
  };

  useEffect(() => {
    if (venues.length > 0) {
      setVenuesForMap(
        venues.map((venue: Venue): VenueForMap => {
          return {
            latLng: { lat: venue.lat, lng: venue.lng },
            slug: venue.slug,
            name: venue.name,
            photos: venue.photos,
            address: venue.address,
          };
        })
      );
      setCenter(
        calculateCenter(
          venues.map((venue: Venue) => {
            return { lat: venue.lat, lng: venue.lng };
          })
        )
      );
    }
  }, [venues]);

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // });

  const dataForVenuesSidebar = venues.map((venue: Venue) => {
    return {
      id: venue._id,
      name: venue.name,
      address: venue.address,
      rating: venue.rating,
      thumbnail: venue.photos[0].url.medium,
      slug: venue.slug,
      lat: venue.lat,
      lng: venue.lng,
      photos: venue.photos,
    };
  });

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0; // Scroll to the top of the modal
    }
  }, [venuesForMap]);

  return (
    <div className='search-venues-map-display'>
      <div className='modal' ref={modalRef}>
        <div className='modal-header'>
          <Image
            src='/assets/icons/modal-close-icon-2.png'
            alt='close'
            width={24}
            height={24}
            onClick={handleCloseModal}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='modal-body'>
          <aside>
            {dataForVenuesSidebar.map((venue: any) => {
              return (
                <SidebarVenueCard
                  {...venue}
                  index={venue.id}
                  key={venue.id}
                  setVenuesForMap={setVenuesForMap}
                  venue={venue}
                  setSelectedMarker={setSelectedMarker}
                />
              );
            })}
          </aside>
          <article>
            {venuesForMap && venuesForMap.length > 0 && (
              <GoogleMap
                center={center}
                zoom={14}
                initialVenues={venuesForMap}
                locale={locale}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                fullHeight={true}
              />
            )}
            {/* <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: venuesForMap[0]?.lat, lng: venuesForMap[0]?.lng }}
              zoom={12}
            >
              <MarkerClusterer styles={clusterStyles}>
                {(clusterer) =>
                  venuesForMap &&
                  venuesForMap.length > 0 &&
                  venuesForMap.map((coord, index) => {
                    return (
                      <Marker
                        key={index}
                        position={{
                          lat: Number(coord?.lat),
                          lng: Number(coord?.lng),
                        }}
                        icon={{
                          url: "/assets/icons/pin-g-map-white.svg",
                          scaledSize: { width: 50, height: 50 },
                          origin: { x: 0, y: 0 },
                          anchor: { x: 25, y: 50 },
                        }}
                        clusterer={clusterer}
                        onClick={() => {
                          handleMarkerClick(coord);
                        }}
                      />
                    );
                  })
                }
              </MarkerClusterer>
              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={handleCloseInfoWindow}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -45),
                  }}
                >
                  <div ref={infoWindowRef}>
                    <GoogleMapInfoWindow
                      marker={selectedMarker}
                      locale={locale}
                    />
                  </div>
                </InfoWindow>
              )}
            </GoogleMap> */}
          </article>
        </div>
      </div>
    </div>
  );
};
export default VenuesMap;
