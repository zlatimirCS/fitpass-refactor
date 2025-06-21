import axios from 'axios';

export async function getHpContent(locale: string) {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate a delay
  const lang = locale === 'en' ? 'secondary' : 'primary';
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getcmshomepagefrontcontent`,
      {
        language: lang,
        countryCode: process.env.NEXT_PUBLIC_PRIMARY_COUNTRY_CODE
      }
    );
    const data = response.data;
    console.log('Fetched data:', data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
