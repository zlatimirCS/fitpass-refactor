import GoogleMap from './GoogleMap';

const SearchResultsMap = ({ pinPosition, handleOpenModal, t }: any) => {
  const latLng = {
    lat: pinPosition?.lat,
    lng: pinPosition?.lng,
  };

  const initialVenues = [
    {
      latLng: latLng,
      title: 'Fitpass',
    },
  ];

  const handleShowVenuesModal = () => {
    handleOpenModal();
  };
  return (
    <div className='explore-network-search-results-map'>
      <div className='explore-network-search-results-map__map'>
        {initialVenues && initialVenues?.length > 0 && (
          <GoogleMap
            center={latLng}
            zoom={8}
            initialVenues={initialVenues}
            fullHeight={true}
          />
        )}
        <div className='explore-network-search-results-map__map__overlay'>
          <button className='btn-venue-map' onClick={handleShowVenuesModal}>
            {t?.showOnMap}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsMap;
