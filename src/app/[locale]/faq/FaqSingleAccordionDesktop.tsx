import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Key, memo } from 'react';

const FaqSingleAccordionDesktop = ({
  accordionData,
}: {
  accordionData: any;
}) => {
  return (
    <>
      <h2>{accordionData.mainTitle}</h2>
      {accordionData.items.map(
        (
          content: {
            title: any;
            content: any;
          },
          index: Key | null | undefined
        ) => {
          return (
            <div key={index} className='single-accordion-item'>
              <Accordion
                sx={{
                  boxShadow: 'none',
                  borderBottom: '1px solid #adadad',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  borderBottomLeftRadius: '0 !important',
                  borderBottomRightRadius: '0 !important',
                  '&.Mui-expanded': {
                    margin: '0',
                  },
                  '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: '12px 0',
                  },
                  '& .MuiAccordionSummary-root.Mui-expanded': {
                    minHeight: 'unset',
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    flexShrink: '0',
                  },
                }}
              >
                <AccordionSummary
                  sx={{
                    gap: '10px',
                    padding: '0',
                  }}
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        width: '30px',
                        height: '30px',
                        flexShrink: '0 !important',
                      }}
                    />
                  }
                >
                  <p className='accordion-title'>{content.title}</p>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: '0 0 16px 0',
                    '@media (min-width: 1024px)': {
                      padding: '0 16px 16px',
                    },
                  }}
                >
                  <div className='accordion-content'>
                    <div
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        }
      )}
    </>
  );
};
export default memo(FaqSingleAccordionDesktop);
