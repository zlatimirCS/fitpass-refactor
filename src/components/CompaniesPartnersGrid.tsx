import Link from 'next/link';

type MainHpData = {
  section1Card1Icon?: string;
  section1Card1Title?: string;
  section1Card1SubtitlePart1?: string;
  section1Card1SubtitlePart2?: string;
  section1Card1ButtonUrl?: string;
  section1Card1ButtonText?: string;
  section1Card2Icon?: string;
  section1Card2Title?: string;
  section1Card2SubtitlePart1?: string;
  section1Card2SubtitlePart2?: string;
  section1Card2ButtonUrl?: string;
  section1Card2ButtonText?: string;
};

interface CompaniesPartnersGridProps {
  mainHpData?: MainHpData;
}

const CompaniesPartnersGrid = async ({
  mainHpData
}: CompaniesPartnersGridProps) => {
  if (!mainHpData) {
    return <p>There was an error loading data</p>;
  }

  return (
    <>
      <section className="explore-network-coming-soon-content topBottomSpacing">
        <section className="companies-partners">
          <div className="wrapper">
            <div className="companies-partners-grid">
              <article className="companies-partners-card">
                <div
                  style={{
                    backgroundImage: `url(${
                      mainHpData
                        ? mainHpData?.section1Card1Icon
                        : '/assets/icons/iconComp.svg'
                    })`
                  }}
                  className="card-icon"
                ></div>
                <div>
                  <h3>
                    {mainHpData?.section1Card1Title
                      ? mainHpData?.section1Card1Title
                      : ''}
                  </h3>
                  <p>
                    {mainHpData?.section1Card1SubtitlePart1
                      ? mainHpData?.section1Card1SubtitlePart1
                      : ''}
                    <br />
                    {mainHpData?.section1Card1SubtitlePart2
                      ? mainHpData?.section1Card1SubtitlePart2
                      : ''}
                  </p>
                </div>
                <Link
                  href={
                    mainHpData?.section1Card1ButtonUrl
                      ? mainHpData?.section1Card1ButtonUrl
                      : '/'
                  }
                >
                  <button className="card-btn">
                    {mainHpData?.section1Card1ButtonText
                      ? mainHpData?.section1Card1ButtonText
                      : ''}
                  </button>
                </Link>
              </article>
              <article className="companies-partners-card">
                <div
                  className="card-icon"
                  style={{
                    backgroundImage: `url(${
                      mainHpData?.section1Card2Icon
                        ? mainHpData?.section1Card2Icon
                        : '/assets/icons/iconPartn.svg'
                    })`
                  }}
                ></div>
                <div>
                  <h3>
                    {mainHpData?.section1Card2Title
                      ? mainHpData?.section1Card2Title
                      : ''}
                  </h3>
                  <p>
                    {mainHpData?.section1Card2SubtitlePart1
                      ? mainHpData?.section1Card2SubtitlePart1
                      : ''}
                    <br />
                    {mainHpData?.section1Card2SubtitlePart2
                      ? mainHpData?.section1Card2SubtitlePart2
                      : ''}
                  </p>
                </div>
                <Link
                  href={
                    mainHpData?.section1Card2ButtonUrl
                      ? mainHpData?.section1Card2ButtonUrl
                      : '/'
                  }
                >
                  <button className="card-btn">
                    {mainHpData?.section1Card2ButtonText
                      ? mainHpData?.section1Card2ButtonText
                      : ''}
                  </button>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
export default CompaniesPartnersGrid;
