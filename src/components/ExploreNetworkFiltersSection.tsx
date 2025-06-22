'use client';
import { routeTranslations } from '@/lib/routeTranslations';
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
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GoogleMap from './GoogleMap';

interface City {
  _id: string;
  name: string;
  nameEn: string;
  areas: CityArea[];
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

interface Venue {
  latLng: { lat: number; lng: number };
  slug: string;
  name: string;
  photos: any[];
  address: any;
}

interface Center {
  lat: number;
  lng: number;
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

const ExploreNetworkFiltersSection = ({ allCities }: { allCities: City[] }) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  console.log('locale', locale);

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>(allCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [citiesParts, setCitiesParts] = useState<CityArea[]>([]);
  const [selectedCityPart, setSelectedCityPart] = useState<CityArea[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [initialVenues, setInitialVenues] = useState<Venue[]>([]);
  const [center, setCenter] = useState<Center | null>(null);
  const [initialDisciplines, setInitialDisciplines] = useState<Discipline[]>(
    []
  );
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(
    []
  );
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
  const [query, setQuery] = useState('');

  const [selectInputsOpenStates, setSelectInputsOpenStates] = useState({
    cityPart: false,
    disciplines: false,
    activities: false,
    attributes: false,
  });

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
      setCities(allCities);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-cities?q=${query}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
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

  const constructUrlQuery = (
    selectedCity: City | null,
    selectedCityPart: CityArea[],
    selectedDisciplines: Discipline[],
    selectedAttributes: Attribute[],
    searchTerm: string
  ) => {
    const queryParams = [];

    if (searchTerm) {
      queryParams.push(`searchTerm=${searchTerm}`);
    }

    if (selectedCity) {
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

  const handleResetWholeForm = () => {
    setSelectedCity(null);
    setInputValue('');
    setSelectedCityPart([]);
    setSelectedDisciplines([]);
    setSelectedActivities([]);
    setSelectedAttributes([]);
    setSearchTerm('');
  };
  const fetchInitialVenues = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/filtered-venues`,
        {
          // countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
        },
        {
          params: {
            countryCode: process.env.NEXT_PUBLIC_PRIMARY_CC,
          },
        }
      );
      if (response.data) {
        setInitialVenues(
          response.data.venues.map((venue: any): Venue => {
            return {
              latLng: {
                lat: venue.lat,
                lng: venue.lng,
              },
              slug: `/explore-network/${venue.slug}`,
              name: venue.name,
              photos: venue.photos || [],
              address: venue.address,
            };
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitialDisciplines();
    fetchInitialVenues();
  }, []);

  const calculateCenter = (coords: Array<{ lat: number; lng: number }>) => {
    const latitudes = coords.map(
      (coord: { lat: number; lng: number }) => coord.lat
    );
    const longitudes = coords.map(
      (coord: { lat: number; lng: number }) => coord.lng
    );
    const avgLat =
      latitudes.reduce((a: number, b: number) => a + b, 0) / latitudes.length;
    const avgLng =
      longitudes.reduce((a: number, b: number) => a + b, 0) / longitudes.length;
    return { lat: avgLat, lng: avgLng };
  };

  useEffect(() => {
    if (initialVenues.length > 0) {
      const centerCoords = calculateCenter(
        initialVenues.map((venue: Venue) => venue.latLng)
      );
      setCenter(centerCoords);
    }
  }, [initialVenues]);

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

    if (query === '') {
      console.log('Please select at least one filter');
      return;
    }
    setLoading(true);
    router.push(
      `/${locale}/${
        locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
          ? routeTranslations[locale as keyof typeof routeTranslations][
              'explore-network'
            ]
          : 'explore-network'
      }/search${query}`
    );
  };

  function CustomPaper(props: any) {
    return (
      <Paper
        sx={{
          bgcolor: '#fff',
          '& .MuiAutocomplete-option': {
            fontSize: '18px',
            fontWeight: '400',
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

  const infoWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        infoWindowRef.current &&
        !infoWindowRef.current.contains(event.target as Node)
      ) {
        // Info window close logic removed since selectedMarker was removed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className='explore-network-filters-section'>
      <div className='explore-network-filters-wrap--desktop'>
        <aside className='explore-network-filters'>
          <article className='single-explore-dropdown'>
            <div className='accordion-content-location'>
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
                  placeholder='Location name'
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
                    option[
                      `${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? 'name' : 'nameEn'}`
                    ]
                  }
                  value={selectedCity}
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
                        fontSize: '25px',
                      },
                    },
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder='City'
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
                  )}
                />
              </div>

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
                    value={selectedCityPart || []}
                    displayEmpty
                    onChange={(e: any) => handleCityPartChange(e.target.value)}
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
                            City Area
                          </span>
                        );
                      }
                      return (
                        <Stack gap={1} direction='row' flexWrap='wrap'>
                          {selected?.map((value: CityArea) => (
                            <Chip
                              key={value?._id}
                              label={
                                value[
                                  `${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? 'name' : 'nameEn'}`
                                ]
                              }
                              onDelete={() =>
                                handleCityPartChange(
                                  selectedCityPart?.filter(
                                    (item: CityArea) => item?._id !== value?._id
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
                      <em>City Area</em>
                    </MenuItem>
                    {citiesParts.map((area: CityArea) => (
                      <MenuItem
                        key={area._id}
                        value={area._id}
                        sx={{
                          justifyContent: 'space-between',
                          fontSize: '16px',
                          color: '#666666',
                        }}
                      >
                        {
                          area[
                            `${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? 'name' : 'nameEn'}`
                          ]
                        }
                        {selectedCityPart?.some(
                          (item: CityArea) => item?._id === area?._id
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
                          Clear
                        </button>
                        <button
                          className='search-btn filters-options'
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handleOkButtonClick(e, 'cityPart');
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </CustomMenu>
                  </Select>
                </FormControl>
              </div>

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
                            Disciplines
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
                                  `${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? 'name' : 'nameEn'}`
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
                      <em>Disciplines</em>
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
                              `${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? 'name' : 'nameEn'}`
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
                          Clear
                        </button>
                        <button
                          className='search-btn filters-options'
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handleOkButtonClick(e, 'disciplines');
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </CustomMenu>
                  </Select>
                </FormControl>
              </div>
            </div>
          </article>

          <div className='filters-options'>
            <button
              className='clear-btn'
              style={{ color: '#666666', border: '1px solid #666666' }}
              onClick={handleResetWholeForm}
            >
              Clear
            </button>
            <button
              className='search-btn'
              onClick={(e: React.MouseEvent) => handleApplyFilters(e as any)}
            >
              {loading ? 'Loading' : 'Apply'}
            </button>
          </div>
        </aside>
        <div className='explore-network-map'>
          {/* GoogleMap component would go here */}
          {/* <div>Map placeholder</div> */}
          <GoogleMap
            center={center}
            zoom={9}
            initialVenues={initialVenues}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreNetworkFiltersSection;
