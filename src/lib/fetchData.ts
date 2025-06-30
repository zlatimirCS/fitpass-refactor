import axios from 'axios';

export async function getMainSlideshowData(locale: string) {
  // Simulate a delay
  const lang =
    locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
      ? 'primary'
      : 'secondary';
  try {
    const responseSlideshow = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cms-get-sliders-front`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
        language: lang,
      }
    );
    const data = responseSlideshow.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

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

export async function getForCompaniesContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsforcompaniesfrontcontent`,
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

export async function getForPartnersContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsforpartnersfrontcontent`,
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

export async function getContactContent(locale: string) {
  // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmscontactfrontcontent`,
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

export async function cmsGetIsAboutUsHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsaboutusfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.auHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function cmsGetIsForPartnersHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsforpartnersfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.fpHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function cmsGetIsForCompaniesHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsforcompaniesfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.fcHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function cmsGetIsFitpassClubHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsclubfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.clHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function cmsGetIsContactHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmscontactfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.ctHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function cmsGetIsExploreNetworkHidden() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmsexplorenetworkfronthidden`,
      {
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE,
      }
    );
    const data = response.data.enHide;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
