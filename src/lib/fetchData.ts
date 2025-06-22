import axios from 'axios';

export async function getHpContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmshomepagefrontcontent`,
      {
        language: lang,
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getAboutUsContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsaboutusfrontcontent`,
      {
        language: lang,
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getExploreNetworkContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsexplorenetworkfrontcontent`,
      {
        language: lang,
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getCities() {
  // Simulate a delay
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-cities`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
      }
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getSearchExploreNetworkContent(searchParams: string) {
  // Simulate a delay
  // const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/filtered-venues?${searchParams}`,
      {
        // countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
      },
      {
        params: {
          countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
        },
      }
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getSingleVenueData(slug: string) {
  // Simulate a delay
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-venue-by-slug/${slug}`
    );
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
