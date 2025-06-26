'use client';
import { CmsDataForPartners } from '@/types/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { memo, useState } from 'react';

const MoreInfoForPartnersSection = ({
  cmsDataForPartners,
}: CmsDataForPartners) => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel: string) => {
    if (expanded === panel) {
      setExpanded('');
      return;
    }
    setExpanded(panel ? panel : '');
  };
  const wantMoreInfoArray = [
    {
      title: cmsDataForPartners?.section3Info1Title
        ? cmsDataForPartners?.section3Info1Title
        : '',
      subtitle: cmsDataForPartners?.section3Info1Text
        ? cmsDataForPartners?.section3Info1Text
        : '',
      panel: 'panel1',
    },
    {
      title: cmsDataForPartners?.section3Info2Title
        ? cmsDataForPartners?.section3Info2Title
        : '',
      subtitle: cmsDataForPartners?.section3Info2Text
        ? cmsDataForPartners?.section3Info2Text
        : '',
      panel: 'panel2',
    },
    {
      title: cmsDataForPartners?.section3Info3Title
        ? cmsDataForPartners?.section3Info3Title
        : '',
      subtitle: cmsDataForPartners?.section3Info3Text
        ? cmsDataForPartners?.section3Info3Text
        : '',
      panel: 'panel3',
    },
    {
      title: cmsDataForPartners?.section3Info4Title
        ? cmsDataForPartners?.section3Info4Title
        : '',
      subtitle: cmsDataForPartners?.section3Info4Text
        ? cmsDataForPartners?.section3Info4Text
        : '',
      panel: 'panel4',
    },
  ];

  return (
    <div className='for-partners-info'>
      <div className='wrapper wrapper-accordions'>
        <h2>
          {cmsDataForPartners?.section3MainHeading
            ? cmsDataForPartners?.section3MainHeading
            : ''}
        </h2>
        {wantMoreInfoArray &&
          wantMoreInfoArray.length > 0 &&
          wantMoreInfoArray.map((item, index) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === item.panel}
                onChange={() => handleChange(item.panel)}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #adadad',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  borderBottomLeftRadius: '0 !important',
                  borderBottomRightRadius: '0 !important',
                  margin: '20px 0',
                  padding: '10px 0 0 0',
                  '&.Mui-expanded': {
                    // margin: "0",

                    padding: '10px 0 0 0',
                    '& .MuiSvgIcon-root': {
                      fill: '#e5431f',
                    },
                  },
                  '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: '12px 0',
                  },
                  '& .MuiAccordionSummary-root.Mui-expanded': {
                    minHeight: 'unset',
                    '& p.accordion-title': {
                      color: '#e5431f',
                    },
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    flexShrink: '0',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        width: '30px',
                        height: '30px',
                        flexShrink: '0',
                      }}
                    />
                  }
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <p className='for-partners-acc-title'>{item.title}</p>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: '8px 16px 25px',
                  }}
                >
                  <p className='for-partners-acc-subtitle'>{item.subtitle}</p>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
};
export default memo(MoreInfoForPartnersSection);
