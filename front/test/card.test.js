import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import{Carte, Card1,Card2,CardEbillet,CardCompte,CardOffre,Cardoffre1} from '../src/composants/card';

describe('Carte Component', () => {
  test('renders Carte component with given props', () => {
    const props = {
      hsport: 'Test Sport Title',
      psport: 'Test Sport Paragraph',
      hoffre: 'Test Offer Title',
      poffre: 'Test Offer Paragraph',
    };

    render(<Carte {...props} />);

    // Vérifiez que les titres et les paragraphes sont présents
    const sportTitle = screen.getByText(props.hsport);
    const sportParagraph = screen.getByText(props.psport);
    const offerTitle = screen.getByText(props.hoffre);
    const offerParagraph = screen.getByText(props.poffre);

    expect(sportTitle).toBeInTheDocument();
    expect(sportParagraph).toBeInTheDocument();
    expect(offerTitle).toBeInTheDocument();
    expect(offerParagraph).toBeInTheDocument();
  });
});

describe('Card1 Component', () => {
    test('renders Card1 component with given props', () => {
      const props = {
        titlecard1: 'Test Card Title',
        pcard1: 'Test Card Text',
        image: 'test-image.jpg'
      };
  
      render(<Card1 {...props} />);
  
      // Vérifiez que le titre et le texte sont présents
      const cardTitle = screen.getByText(props.titlecard1);
      const cardText = screen.getByText(props.pcard1);
      const cardImage = screen.getByRole('img');
  
      expect(cardTitle).toBeInTheDocument();
      expect(cardText).toBeInTheDocument();
      expect(cardImage).toHaveAttribute('src', props.image);
    });
  });
  describe('Card2 Component', () => {
    test('renders Card2 component with given props', () => {
      const props = {
        offre: 'Test Offer',
        description: 'Test Description',
        click: jest.fn(),
        value: 'Test Value',
        btn: 'Cliquez ici !'
      };
  
      render(<Card2 {...props} />);
  
      // Vérifiez que l'offre, la description et le bouton sont présents
      const offerText = screen.getByText(props.offre);
      const descriptionText = screen.getByText(props.description);
      const buttonElement = screen.getByText(/Cliquez ici !/i); 
      expect(offerText).toBeInTheDocument();
      expect(descriptionText).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
    });
  });

 
  
  describe('CardOffre Component', () => {
    test('renders CardOffre component with given props', () => {
      const props = {
        // Remplacez ceci par les vrais props de votre composant
        offre: 'Test offre',
        description: 'Test Description',
       
      };
  
      render(<CardOffre {...props} />);
  
      // Vérifiez que le titre, la description et l'image sont présents
      const cardTitle = screen.getByText(props.offre);
      const cardDescription = screen.getByText(props.description);
      
  
      expect(cardTitle).toBeInTheDocument();
      expect(cardDescription).toBeInTheDocument();
      
    });
  });

  describe('Cardoffre1 Component', () => {
    test('renders Cardoffre1 component with given props', () => {
      const props = {
        id: '1',
        image: 'testImage.jpg',
        offre: 'Test Offer',
        description: 'Test Description',
        prix: '100',
        sport: 'Football',
      };
  
      render(<Cardoffre1 {...props} />);
  
      // Vérifiez que l'image est présente
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(props.image);
  
      // Vérifiez que les champs cachés sont présents avec les bonnes valeurs
      const idInput = screen.getByDisplayValue(props.id);
      expect(idInput).toBeInTheDocument();
      expect(idInput.type).toBe('hidden');
  
      const imgInput = screen.getByDisplayValue(props.image);
      expect(imgInput).toBeInTheDocument();
      expect(imgInput.type).toBe('hidden');
    });
  });