/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './app/(tabs)/index';

// Mock the fetch function
global.fetch = jest.fn();

describe('Term Clarifier App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    
    // Check if main components are rendered
    expect(getByText('Term Clarifier')).toBeTruthy();
    expect(getByText('Look up any term for its definition')).toBeTruthy();
    expect(getByPlaceholderText('Enter a term (e.g., photosynthesis)')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('shows loading indicator when fetching data', async () => {
    // Mock a delayed response
    fetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve([mockDefinitionData])
        });
      }, 100))
    );

    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    
    // Enter a term and submit
    const input = getByPlaceholderText('Enter a term (e.g., photosynthesis)');
    fireEvent.changeText(input, 'test');
    
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    // Check if loading state is shown
    expect(getByText('Looking up term...')).toBeTruthy();
    
    // Wait for the loading to finish
    await waitFor(() => expect(queryByText('Looking up term...')).toBeNull());
  });

  it('shows error message when API returns an error', async () => {
    // Mock a failed response
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 404
      })
    );

    const { getByPlaceholderText, getByText } = render(<App />);
    
    // Enter a term and submit
    const input = getByPlaceholderText('Enter a term (e.g., photosynthesis)');
    fireEvent.changeText(input, 'nonexistentterm');
    
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    // Check if error message is shown
    await waitFor(() => expect(getByText('Error: Term not found')).toBeTruthy());
  });

  it('displays definition data correctly when API returns success', async () => {
    // Mock a successful response
    const mockDefinitionData = {
      word: 'test',
      phonetic: '/test/',
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'A procedure for critical evaluation',
              example: 'The test was a success',
              synonyms: ['examination', 'assessment']
            }
          ]
        }
      ]
    };

    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockDefinitionData])
      })
    );

    const { getByPlaceholderText, getByText } = render(<App />);
    
    // Enter a term and submit
    const input = getByPlaceholderText('Enter a term (e.g., photosynthesis)');
    fireEvent.changeText(input, 'test');
    
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    // Check if definition data is displayed correctly
    await waitFor(() => {
      expect(getByText('test')).toBeTruthy();
      expect(getByText('/test/')).toBeTruthy();
      expect(getByText('noun')).toBeTruthy();
      expect(getByText('A procedure for critical evaluation')).toBeTruthy();
      expect(getByText('Example: "The test was a success"')).toBeTruthy();
      expect(getByText('examination, assessment')).toBeTruthy();
    });
  });

  it('prevents search when term is empty', () => {
    const { getByText } = render(<App />);
    
    // Try to search with an empty term
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    // Fetch should not have been called
    expect(fetch).not.toHaveBeenCalled();
  });
});