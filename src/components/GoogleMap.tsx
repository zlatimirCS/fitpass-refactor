'use client'; // Required for Next.js 13+ App Router

import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import GoogleMapInfoWindow from './GoogleMapInfoWindow';

const GoogleMap = ({
  center,
  initialVenues,
  fullHeight,
  zoom,
  readOnly,
}: any) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not defined');
      return;
    }

    const loader = new Loader({
      apiKey, // Use environment variable for security
      version: 'weekly',
      libraries: ['places'], // Remove "marker" from here, we'll load it manually
    });

    loader.load().then(async () => {
      if (!mapRef.current) return;

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as any; // Load AdvancedMarkerElement properly

      const map = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom ? zoom : 8,
        mapId: 'YOUR_MAP_ID', // Optional: Set a Map ID for custom styles
      });

      const infoWindow = new google.maps.InfoWindow();
      const markers: any[] = [];

      if (initialVenues && initialVenues.length) {
        initialVenues.forEach((location: any) => {
          const markerContent = document.createElement('div');
          const markerImg = document.createElement('img');
          markerImg.src = '/assets/icons/pin-g-map-white.svg';
          markerImg.style.width = '50px';
          markerImg.style.height = '50px';
          markerContent.appendChild(markerImg);

          const marker = new AdvancedMarkerElement({
            position: {
              lat: location?.latLng?.lat,
              lng: location?.latLng?.lng,
            },
            map,
            title: location?.title,
            content: markerContent,
          });

          if (!readOnly) {
            marker.addListener('click', () => {
              const container = document.createElement('div');

              // Render the React component inside the container
              const root = ReactDOM.createRoot(container);
              root.render(
                <GoogleMapInfoWindow marker={location} locale='en' />
              );

              // Set the container as the content of the info window
              infoWindow.setContent(container);
              infoWindow.open(map, marker);
            });
          }

          markers.push(marker);
        });
      }

      // **Use MarkerClusterer from @googlemaps/markerclusterer**
      new MarkerClusterer({
        map,
        markers,
        renderer: {
          render: ({ count, position }) => {
            const clusterContent = document.createElement('div');
            const clusterImg = document.createElement('img');
            clusterImg.src = '/assets/icons/pin-g-map-white-empty-pin.svg';
            clusterImg.style.width = '50px';
            clusterImg.style.height = '50px';
            clusterContent.appendChild(clusterImg);

            const clusterLabel = document.createElement('div');
            clusterLabel.style.position = 'absolute';
            clusterLabel.style.top = '35%';
            clusterLabel.style.left = '50%';
            clusterLabel.style.transform = 'translate(-50%, -50%)';
            clusterLabel.style.color = '#e5431f';
            clusterLabel.style.fontSize = '14px';
            clusterLabel.style.fontWeight = 'bold';
            clusterLabel.innerText = count.toString();
            clusterContent.appendChild(clusterLabel);

            return new AdvancedMarkerElement({
              position,
              content: clusterContent,
              //   anchor: { x: 25, y: 25 },
            });
          },
        },
      });
    });
  }, [center, initialVenues]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: `${fullHeight ? '100%' : '710px'}` }}
    />
  );
};

export default GoogleMap;
