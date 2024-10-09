import React, {useRef, useState} from 'react';
import {Pressable, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {scaleFontSize} from '../../assets/styles/scaling';
import style from './style';

// Search Component
/**
 * NAME
 *
 * Search - A reusable search input component with an icon that triggers a search action.
 *
 * SYNOPSIS
 *
 * Search(props)
 *  props.placeholder - Placeholder text displayed inside the input field (optional, default is "Search").
 *  props.onSearch   - Function that is called whenever the input text changes (optional, default is an empty function).
 *
 * DESCRIPTION
 *
 * This functional component renders a search bar that includes a search icon and an input field.
 * It allows the user to enter search text and also provides a focus-triggering mechanism when the
 * surrounding container is pressed. The input value is managed locally and the onSearch callback is
 * invoked whenever the input text changes.
 *
 * RETURNS
 *
 *  JSX element representing a search input field with an icon.
 */
const Search = props => {
  // Reference to the TextInput component to manage focus programmatically
  const textInputRef = useRef(null);

  // State to store the current value of the search input
  const [search, setSearch] = useState('');

  // Function to handle focus on the input field when the surrounding container is pressed
  const handleFocus = () => {
    textInputRef.current.focus();
  };

  // Function to handle search input changes
  /**
   * handleSearch - Updates the search state and calls the onSearch prop.
   *
   * PARAMETERS
   *
   *  searchValue     - The new value entered in the search input field.
   */
  const handleSearch = searchValue => {
    setSearch(searchValue); // Update the local state with the new search value
    props.onSearch(searchValue); // Call the onSearch callback with the new value
  };

  return (
    // Pressable container that triggers focus on the input field when pressed
    <Pressable style={style.searchInputContainer} onPress={handleFocus}>
      {/* Search icon displayed inside the input container */}
      <FontAwesomeIcon
        icon={faSearch}
        color={'#25C0FF'}
        size={scaleFontSize(22)}
      />
      {/* TextInput component for entering the search text */}
      <TextInput
        placeholder={props.placeholder} // Set placeholder text if provided
        ref={textInputRef} // Reference to allow programmatic focus
        style={style.searchInput} // Apply custom styles to the input field
        value={search} // Bind the value to the search state
        onChangeText={value => handleSearch(value)} // Handle text changes with the handleSearch function
      />
    </Pressable>
  );
};

// Default prop values for the Search component
/**
 * defaultProps - Provides default values for the props to ensure the component behaves correctly if no values are provided.
 */
Search.defaultProps = {
  onSearch: () => {}, // Default onSearch function is an empty function
  placeholder: 'Search', // Default placeholder text is "Search"
};

// Define prop types to enforce the correct props for the Search component
Search.propTypes = {
  onSearch: PropTypes.func, // Function to handle the search input change
  placeholder: PropTypes.string, // Placeholder text for the search input
};

// Export the Search component for use in other parts of the application
export default Search;
