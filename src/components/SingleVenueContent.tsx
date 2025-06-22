import SingleVenueDisplay from './SingleVenueDisplay';

const SingleVenueContent = ({
  data,
  comments,
  aboutUs,
}: {
  data: any;
  comments: any;
  aboutUs: any;
}) => {
  // if (!cmsDataAboutUs) {
  //   return <p>There was an error loading data</p>;
  // }
  console.log('single venue data', data?.socialNetworks);
  return (
    <>
      <SingleVenueDisplay data={data} comments={comments} aboutUs={aboutUs} />
    </>
  );
};
export default SingleVenueContent;
