import { render } from '@testing-library/react';
import OfferCard from '../src/composants/offerCard';
import React from 'react';
import '@testing-library/jest-dom';

test('renders OfferCard component with correct props', () => {
  const { getByText } = render(
    <OfferCard 
      fronttitre="Front Title" 
      frontcontent="Front Content" 
      backtitre="Back Title" 
      backcontent="Back Content" 
    />
  );

  expect(getByText('Front Title')).toBeInTheDocument();
  expect(getByText('Front Content')).toBeInTheDocument();
  expect(getByText('Back Title')).toBeInTheDocument();
  expect(getByText('Back Content')).toBeInTheDocument();
});