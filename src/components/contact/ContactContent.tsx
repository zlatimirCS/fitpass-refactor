'use client';
import { CmsDataContact } from '@/types/types';
import { useState } from 'react';
import FormSection from './FormSection';
import HeaderContact from './HeaderContact';
import SucessContactModal from './SucessContactModal';

const ContactContent = ({ cmsDataContact }: CmsDataContact) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };
  if (!cmsDataContact) {
    return <p>There was an error loading data</p>;
  }
  return (
    <div style={{ position: 'relative' }}>
      {isModalVisible && (
        <SucessContactModal handleModalClose={handleModalClose} />
      )}
      <HeaderContact cmsDataContact={cmsDataContact} />
      <FormSection
        handleModalOpen={handleModalOpen}
        cmsDataContact={cmsDataContact}
      />
    </div>
  );
};
export default ContactContent;
