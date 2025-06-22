'use client';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import {
  Autocomplete,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import * as NProgress from 'nprogress';
import { useCallback, useEffect, useState } from 'react';
import SearchResultsMap from './SearchResultMap';
import SearchResultsVenues from './SearchResultsVenues';
import VenuesMap from './VenuesMap';

interface City {
  _id: string;
  name: string;
  nameEn: string;
  areas: CityArea[];
  lat?: number;
  lng?: number;
}

interface CityArea {
  _id: string;
  name: string;
  nameEn: string;
  slug: string;
}

interface Discipline {
  _id: string;
  name: string;
  nameEn: string;
  id?: string;
}

interface Activity {
  _id: string;
  disciplineId: string;
  name: string;
  nameEn: string;
}

interface Attribute {
  _id: string;
  disciplineId: string;
  name: string;
  nameEn: string;
}

// interface Venue {
//   lat: number;
//   lng: number;
//   slug: string;
//   name: string;
//   latLng?: { lat: number; lng: number };
// }

// interface Center {
//   lat: number;
//   lng: number;
// }

interface SearchData {
  city?: City;
  cityAreas?: CityArea[];
  disciplines?: Discipline[];
  activities?: Activity[];
  attributes?: Attribute[];
  searchTerm?: string;
  venues?: any[];
}

interface SearchResultsExploreNetworkFiltersSectionProps {
  data: SearchData;
  allCities: City[];
}

const CustomMenu = styled('div')(({ theme }: { theme: any }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  position: 'sticky',
  bottom: '0',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #666666',
  zIndex: 1,
}));

const SearchResultsExploreNetworkFiltersSection = ({
  data,
  allCities,
}: SearchResultsExploreNetworkFiltersSectionProps) => {
  const t = useTranslations('SearchResultsExploreNetworkFiltersSection');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const student = searchParams.get('student');

  const [cities, fetchCities] = useState<City[]>(allCities);
  // const [clickedActivity, setClickedActivity] = useState([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(
    (data?.city && Object.keys(data?.city).length > 0 && data?.city) || null
  );
  const [inputValue, setInputValue] = useState('');
  const [citiesParts, setCitiesParts] = useState<CityArea[]>([]);
  const [selectedCityPart, setSelectedCityPart] = useState<CityArea[]>(
    data?.cityAreas || []
  );

  const [initialDisciplines, setInitialDisciplines] = useState<Discipline[]>(
    []
  );
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(
    (data && data?.disciplines?.map((item: Discipline) => item)) || []
  );
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>(
    (data && data?.activities?.map((item: Activity) => item)) || []
  );
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>(
    (data && data?.attributes?.map((item: Attribute) => item)) || []
  );
  // const [initialVenues, setInitialVenues] = useState<Venue[]>([]);
  const [query, setQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedMarker, setSelectedMarker] = useState<Venue | null>(null);

  // const [selectedStudent, setSelectedStudent] = useState<string | null>(
  //   searchParams.get('student')
  // );

  const [selectInputsOpenStates, setSelectInputsOpenStates] = useState({
    cityPart: false,
    disciplines: false,
    activities: false,
    attributes: false,
  });

  const [searchTerm, setSearchTerm] = useState(data?.searchTerm || '');

  const handleSelectOpen = (item: string) => {
    setSelectInputsOpenStates(prev => ({
      ...prev,
      [item]: true,
    }));
  };

  const handleSelectClose = (item: string) => {
    setSelectInputsOpenStates(prev => ({
      ...prev,
      [item]: false,
    }));
  };

  const handleOkButtonClick = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    handleSelectClose(item);
  };

  const fetchCityOptions = async (newInputValue: string) => {
    const query = newInputValue;

    if (newInputValue === '') {
      fetchCities(allCities);
      return;
    }
    // setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-cities?q=${query}`
      );
      const data = await response.json();
      fetchCities(data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleCityChange = (event: any, newCity: City | null) => {
    if (newCity === null) {
      setSelectedCity(null);
      setSelectedCityPart([]);
      return;
    }
    setSelectedCity(newCity);
    if (newCity) {
      setCitiesParts(newCity.areas);
    } else {
      setCitiesParts([]);
    }
  };

  const handleCityPartChange = (value: CityArea[]) => {
    setSelectedCityPart(value);
  };

  const handleDisciplinesChange = (newSelectedDisciplines: Discipline[]) => {
    setSelectedDisciplines(newSelectedDisciplines);
  };

  // const handleActivitiesChange = (newSelectedActivities: Activity[]) => {
  //   setSelectedActivities(newSelectedActivities);
  // };

  // const handleAttributesChange = (newSelectedAttributes: Attribute[]) => {
  //   setSelectedAttributes(newSelectedAttributes);
  // };

  // const calculateCenter = (
  //   coords: Array<{ lat: number; lng: number }>
  // ): Center => {
  //   const latitudes = coords.map(coord => coord.lat);
  //   const longitudes = coords.map(coord => coord.lng);
  //   const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  //   const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
  //   return { lat: avgLat, lng: avgLng };
  // };

  // const handleMarkerClick = (marker: Venue) => {
  //   setSelectedMarker(marker);
  // };

  // const handleCloseInfoWindow = () => {
  //   setSelectedMarker(null);
  // };
  // GOOGLE MAPS RELATED

  const constructUrlQuery = (
    selectedCity: City | null,
    selectedCityPart: CityArea[],
    selectedDisciplines: Discipline[],
    selectedAttributes: Attribute[],
    searchTerm: string
  ): string => {
    const queryParams: string[] = [];

    if (searchTerm) {
      queryParams.push(`searchTerm=${searchTerm}`);
    }

    // how to check if the object is not empty

    if (selectedCity && Object.keys(selectedCity).length > 0) {
      queryParams.push(`city=${selectedCity._id}`);
    }

    if (selectedCityPart && selectedCityPart.length > 0) {
      queryParams.push(
        `cityAreas=${selectedCityPart.map((area: CityArea) => area.slug).join(',')}`
      );
    }

    if (selectedDisciplines && selectedDisciplines.length > 0) {
      queryParams.push(
        `disciplines=${selectedDisciplines
          .map((discipline: Discipline) => discipline._id)
          .join(',')}`
      );
    }

    if (selectedActivities && selectedActivities.length > 0) {
      queryParams.push(
        `activities=${selectedActivities
          .map((activity: Activity) => activity._id)
          .join(',')}`
      );
    }

    if (selectedAttributes && selectedAttributes.length > 0) {
      queryParams.push(
        `attributes=${selectedAttributes
          .map((attribute: Attribute) => attribute._id)
          .join(',')}`
      );
    }

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  };

  // fetch initial venues, disciplines
  // const fetchInitialVenues = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/filtered-venues`,
  //       {
  //         // countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
  //       },
  //       {
  //         params: {
  //           countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       setInitialVenues(
  //         response.data.venues.map((venue: any): Venue => {
  //           return {
  //             latLng: {
  //               lat: venue.lat,
  //               lng: venue.lng,
  //             },
  //             slug: `/explore-network/${venue.slug}`,
  //             name: venue.name,
  //             lat: venue.lat,
  //             lng: venue.lng,
  //           };
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchInitialDisciplines = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-discipline`,
        {
          countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
        }
      );
      setInitialDisciplines(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // fetch initial venues, disciplines

  // get activities and attributes based on selected disciplines
  const getActivitiesFromDisciplinesIds = async (
    filteredDisciplines: string[]
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-activities-from-disciplines`,
        {
          disciplineIds: filteredDisciplines,
        }
      );
      setSelectedActivities(response.data.allActivities);
    } catch (error) {
      console.error(error);
    }
  };

  const getAttributesFromDisciplinesIds = async (
    filteredDisciplines: string[]
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-attributes-from-disciplines`,
        {
          disciplineIds: filteredDisciplines,
        }
      );
      setSelectedAttributes(response.data.allAttributes);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  // get activities and attributes based on selected disciplines

  // delete discipline from selected disciplines and filter selected activities based on discipline
  const filterSelectedActivitiesBasedonDiscipline = (discipline: string) => {
    setSelectedActivities(prev => {
      return prev.filter(item => item.disciplineId !== discipline);
    });
  };

  const filterSelectedAttributesBasedonDiscipline = (discipline: string) => {
    setSelectedAttributes(prev => {
      return prev.filter(item => item.disciplineId !== discipline);
    });
  };

  const deleteSelectedDiscipline = (disciplineId: string) => {
    setSelectedDisciplines(
      selectedDisciplines.filter(item => item._id !== disciplineId)
    );
    filterSelectedActivitiesBasedonDiscipline(disciplineId);
    filterSelectedAttributesBasedonDiscipline(disciplineId);
  };
  // delete discipline from selected disciplines and filter selected activities based on discipline

  // reset whole form
  const handleResetWholeForm = () => {
    setSelectedCity(null);
    setInputValue('');
    setSelectedCityPart([]);
    setSelectedDisciplines([]);
    setSelectedActivities([]);
    setSelectedAttributes([]);
    setSearchTerm('');
  };
  // reset whole form

  useEffect(() => {
    fetchInitialDisciplines();
    // fetchInitialVenues();
  }, []);

  useEffect(() => {
    if (selectedDisciplines.length === 0) {
      setSelectedActivities([]);
      setSelectedAttributes([]);
      return;
    }
    const filteredDisciplines = selectedDisciplines.map(
      discipline => discipline._id
    );
    getActivitiesFromDisciplinesIds(filteredDisciplines);
    getAttributesFromDisciplinesIds(filteredDisciplines);
  }, [selectedDisciplines]);

  useEffect(() => {
    const query = constructUrlQuery(
      selectedCity,
      selectedCityPart,
      selectedDisciplines,
      selectedAttributes,
      searchTerm
    );
    setQuery(query);
  }, [
    selectedCity,
    selectedCityPart,
    selectedDisciplines,
    selectedActivities,
    selectedAttributes,
    searchTerm,
  ]);

  const handleApplyFilters = async (e: React.FormEvent) => {
    e.preventDefault();

    // fake promise to simulate loading

    // if query is empty, do nothing
    if (query === '') {
      return;
    }
    NProgress.start();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // setLoading(false);
    // setSelectedStudent(false);
    router.push(
      `/${locale}/${
        locale === 'cg' ? 'istrazi-mrezu' : 'explore-network'
      }/search${query}${student ? '&student=true' : ''}`
    );
    setLoading(false);
  };

  // COMPONENT THAT IS USED FOR STYLING AUTOCOMPLETE
  function CustomPaper(props: any) {
    return (
      <Paper
        sx={{
          bgcolor: '#fff',
          '& .MuiAutocomplete-option': {
            fontSize: '18px',
            fontWeight: '400',
            // color: "red",
          },
          '& .MuiAutocomplete-noOptions': {
            fontSize: '18px',
            fontWeight: '400',
          },
          '& .MuiAutocomplete-groupLabel': {
            bgcolor: '#000',
            color: '#666666',
            fontSize: '18px',
          },
        }}
        {...props}
      />
    );
  }
  // COMPONENT THAT IS USED FOR STYLING AUTOCOMPLETE
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
    // add position fixed to body
    document.body.classList.add('fixed');
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // remove position fixed from body
    document.body.classList.remove('fixed');
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setCitiesParts(selectedCity.areas);
    }
  }, [selectedCity]);

  return (
    <section className='explore-network-filters-section search'>
      <div className='explore-network-filters-wrap--desktop'>
        {/* {loading && <div className="loading-venues-loader"></div>} */}
        {isModalOpen && (
          <VenuesMap
            handleCloseModal={handleCloseModal}
            venues={data.venues || []}
            locale={locale}
          />
        )}
        <div className='wrapper'>
          <aside className='explore-network-filters'>
            {data?.city?.lat && data?.city?.lng && (
              <SearchResultsMap
                pinPosition={data.city || null}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                t={t}
              />
            )}
            <article className='single-explore-dropdown'>
              <div className='accordion-content-location'>
                {/*Enter a city*/}
                <div className='location'>
                  <TextField
                    hiddenLabel
                    id='filled-hidden-label-small'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        handleApplyFilters(e as any);
                      }
                    }}
                    placeholder={t('locationName')}
                    value={searchTerm}
                    sx={{
                      width: '100%',

                      '& .MuiOutlinedInput-root': {
                        marginBottom: '20px',
                        '& fieldset': {
                          borderColor: '#BCBCBC',
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#e5431f',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: '#666666',
                          fontSize: '18px',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option: City) =>
                      option[`${locale === 'cg' ? 'name' : 'nameEn'}`]
                    }
                    value={selectedCity || null}
                    inputValue={inputValue}
                    onInputChange={(event: any, newInputValue: string) => {
                      setInputValue(newInputValue);
                      fetchCityOptions(newInputValue);
                    }}
                    isOptionEqualToValue={(option: City, value: City) =>
                      option._id === value._id
                    }
                    PaperComponent={CustomPaper}
                    onChange={handleCityChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BCBCBC',
                        borderWidth: 2,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#666666',
                      },
                      '& .MuiAutocomplete-popupIndicator': {
                        '& > svg': {
                          // fill: "blue",
                          fontSize: '25px',
                        },
                      },
                    }}
                    renderInput={(params: any) => {
                      if (params.inputProps.value === 'undefined') {
                        params.inputProps.value = '';
                      }
                      return (
                        <TextField
                          {...params}
                          placeholder={t('cityInput')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: '#e5431f',
                              },
                            },
                            '& .MuiInputBase-input::placeholder': {
                              color: '#666666',
                              fontSize: '18px',
                              opacity: 1,
                            },
                          }}
                        />
                      );
                    }}
                  />
                </div>
                {/*Enter a city*/}

                {/*CITY AREA*/}
                <div className='location'>
                  <FormControl
                    sx={{
                      m: 1,
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#e5431f',
                        },
                      },
                    }}
                  >
                    <Select
                      key={selectedCity?._id}
                      disabled={!selectedCity}
                      multiple
                      value={selectedCityPart}
                      displayEmpty
                      onChange={(e: any) =>
                        handleCityPartChange(e.target.value)
                      }
                      open={selectInputsOpenStates?.cityPart}
                      onClose={() => handleSelectClose('cityPart')}
                      onOpen={() => handleSelectOpen('cityPart')}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            marginTop: 8,
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#BCBCBC',
                          borderWidth: 2,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#666666',
                        },
                        '& > svg': {
                          fontSize: '25px',
                        },
                      }}
                      renderValue={(selected: CityArea[]) => {
                        if (selected.length === 0) {
                          return (
                            <span
                              style={{
                                color: '#666666',
                                fontSize: '18px',
                                lineHeight: '1',
                              }}
                            >
                              {t('cityArea')}
                            </span>
                          );
                        }
                        return (
                          <Stack gap={1} direction='row' flexWrap='wrap'>
                            {selected.map((value: CityArea) => (
                              <Chip
                                key={value._id}
                                label={
                                  value[
                                    `${locale === 'cg' ? 'name' : 'nameEn'}`
                                  ]
                                }
                                onDelete={() =>
                                  handleCityPartChange(
                                    selectedCityPart.filter(
                                      (item: CityArea) => item._id !== value._id
                                    )
                                  )
                                }
                                deleteIcon={
                                  <CancelIcon
                                    onMouseDown={(event: React.MouseEvent) =>
                                      event.stopPropagation()
                                    }
                                  />
                                }
                              />
                            ))}
                          </Stack>
                        );
                      }}
                    >
                      <MenuItem disabled value=''>
                        <em>{t('cityArea')}</em>
                      </MenuItem>
                      {citiesParts &&
                        citiesParts.map((area: CityArea) => (
                          <MenuItem
                            key={area._id}
                            value={area._id}
                            sx={{
                              justifyContent: 'space-between',
                              fontSize: '16px',
                              color: '#666666',
                            }}
                          >
                            {area[`${locale === 'cg' ? 'name' : 'nameEn'}`]}
                            {selectedCityPart.some(
                              (item: CityArea) => item._id === area._id
                            ) ? (
                              <CheckIcon color='info' />
                            ) : null}
                          </MenuItem>
                        ))}
                      <CustomMenu>
                        <div className='filters-options'>
                          <button
                            className='clear-btn filters-options'
                            style={{
                              color: '#666666',
                              border: '1px solid #666666',
                            }}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              setSelectedCityPart([]);
                              handleSelectClose('cityPart');
                            }}
                          >
                            {t('clear')}
                          </button>
                          <button
                            className='search-btn filters-options'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleOkButtonClick(e, 'cityPart');
                            }}
                          >
                            {t('apply')}
                          </button>
                        </div>
                      </CustomMenu>
                    </Select>
                  </FormControl>
                </div>
                {/*CITY AREA*/}
                {/*DISCIPLINES*/}
                <div className='location'>
                  <FormControl
                    sx={{
                      m: 1,
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#e5431f',
                        },
                      },
                    }}
                  >
                    <Select
                      multiple
                      value={selectedDisciplines}
                      displayEmpty
                      onChange={(e: any) =>
                        handleDisciplinesChange(e.target.value)
                      }
                      open={selectInputsOpenStates?.disciplines}
                      onClose={() => handleSelectClose('disciplines')}
                      onOpen={() => handleSelectOpen('disciplines')}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            marginTop: 8,
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#BCBCBC',
                          borderWidth: 2,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#666666',
                        },
                        '& > svg': {
                          fontSize: '25px',
                        },
                      }}
                      renderValue={(selected: Discipline[]) => {
                        if (selected.length === 0) {
                          return (
                            <span
                              style={{
                                color: '#666666',
                                fontSize: '18px',
                                lineHeight: '1',
                              }}
                            >
                              {t('disciplines')}
                            </span>
                          );
                        }
                        return (
                          <Stack gap={1} direction='row' flexWrap='wrap'>
                            {selected.map((value: Discipline) => (
                              <Chip
                                key={value._id}
                                label={
                                  value[
                                    `${locale === 'cg' ? 'name' : 'nameEn'}`
                                  ]
                                }
                                onDelete={() =>
                                  deleteSelectedDiscipline(value._id)
                                }
                                deleteIcon={
                                  <CancelIcon
                                    onMouseDown={(event: React.MouseEvent) =>
                                      event.stopPropagation()
                                    }
                                  />
                                }
                              />
                            ))}
                          </Stack>
                        );
                      }}
                    >
                      <MenuItem disabled value=''>
                        <em>{t('disciplines')}</em>
                      </MenuItem>
                      {initialDisciplines &&
                        initialDisciplines.length > 0 &&
                        initialDisciplines.map((discipline: Discipline) => (
                          <MenuItem
                            key={discipline._id}
                            value={discipline._id}
                            sx={{
                              justifyContent: 'space-between',
                              fontSize: '16px',
                              color: '#666666',
                            }}
                          >
                            {
                              discipline[
                                `${locale === 'cg' ? 'name' : 'nameEn'}`
                              ]
                            }
                            {selectedDisciplines.some(
                              (item: Discipline) => item._id === discipline._id
                            ) ? (
                              <CheckIcon color='info' />
                            ) : null}
                          </MenuItem>
                        ))}
                      <CustomMenu>
                        <div className='filters-options'>
                          <button
                            className='clear-btn filters-options'
                            style={{
                              color: '#666666',
                              border: '1px solid #666666',
                            }}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              setSelectedDisciplines([]);
                              handleSelectClose('disciplines');
                            }}
                          >
                            {t('clear')}
                          </button>
                          <button
                            className='search-btn filters-options'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleOkButtonClick(e, 'disciplines');
                            }}
                          >
                            {t('apply')}
                          </button>
                        </div>
                      </CustomMenu>
                    </Select>
                  </FormControl>
                </div>
                {/*DISCIPLINES*/}
              </div>
            </article>

            <div className='filters-options'>
              <button
                className='clear-btn'
                style={{ color: '#666666', border: '1px solid #666666' }}
                onClick={handleResetWholeForm}
              >
                {t('clear')}
              </button>
              <button
                className='search-btn'
                onClick={(e: React.MouseEvent) => handleApplyFilters(e as any)}
              >
                {loading ? t('loading') : t('apply')}
              </button>
            </div>
          </aside>
          <div className='explore-network-search-results'>
            {loading && !data ? (
              <p>{t('loading')}</p>
            ) : (
              <SearchResultsVenues
                data={data.venues || []}
                // locale={locale || 'en'}
                // t={t}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchResultsExploreNetworkFiltersSection;
