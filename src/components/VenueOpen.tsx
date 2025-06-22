const VenueOpen = ({ isOpen, text }: any) => {
  return (
    <div className={`venue-open-closed ${isOpen ? 'green' : 'red'}`}>
      {text}
    </div>
  );
};
export default VenueOpen;
