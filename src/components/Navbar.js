import { useState } from 'react'; 
// Import useState hook from React to manage component state.

import { useNavigate } from 'react-router-dom'; 
// Import useNavigate from React Router to programmatically navigate between routes.

import { FaBars, FaTimes } from 'react-icons/fa'; 
// Import icons from React Icons for a hamburger menu (FaBars) and a close icon (FaTimes).

const Navbar = ({ onSearch }) => { 
  // Define the Navbar component. It accepts a prop 'onSearch' which is a function to handle search submission.

  const [jobTitle, setJobTitle] = useState(''); 
  // Define a state variable 'jobTitle' to store the search input for job title.

  const [location, setLocation] = useState(''); 
  // Define a state variable 'location' to store the search input for location.

  const [datePosted, setDatePosted] = useState('all'); 
  // Define a state variable 'datePosted' to store the selected filter for when the job was posted. Default is 'all'.

  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  // Define a state variable 'isMenuOpen' to control whether the mobile menu is open. Initially, it's set to 'false'.

  const navigate = useNavigate(); 
  // Get the 'navigate' function from React Router to enable programmatic navigation.

  const handleSearch = () => { 
    // Define a function 'handleSearch' that will execute when the search is submitted.

    onSearch({ jobTitle, location, datePosted }, navigate); 
    // Call the 'onSearch' function (passed from the parent component), passing the search parameters and the navigate function.

    setIsMenuOpen(false); 
    // Close the mobile menu after search by setting 'isMenuOpen' to 'false'.
  };

  const toggleMenu = () => { 
    // Define a function 'toggleMenu' to open/close the mobile menu.

    setIsMenuOpen(!isMenuOpen); 
    // Toggle the state of 'isMenuOpen'. If it's true, set it to false, and vice versa.
  };

  return (
    <nav className="bg-white p-4 shadow-lg fixed top-0 w-full z-10"> 
      {/* Define the navbar container with Tailwind CSS classes for styling: fixed at the top, full width, with a shadow effect. */}

      <div className="container mx-auto flex justify-between items-center"> 
        {/* Create a container for the navbar content, with space between elements and centered vertically. */}

        <div className="text-white text-2xl font-bold logo logo-color"><a href="/">JobPortal</a></div> 
        {/* Render the site logo, linking to the homepage ("/"). */}

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden text-white cursor-pointer" onClick={toggleMenu}> 
          {/* Show the hamburger icon (for mobile) only on small screens (hidden on medium screens and up). Attach the toggleMenu function to it. */}

          {isMenuOpen ? <FaTimes size={24} className='text-purple-500'/> : <FaBars size={24} className='text-purple-500'/>} 
          {/* If the mobile menu is open, display the close icon (FaTimes); otherwise, display the hamburger icon (FaBars). Both are styled with Tailwind CSS. */}
        </div>

        {/* Desktop Search Form */}
        <div className="hidden md:flex space-x-4 input"> 
          {/* Display the search form only on medium and larger screens (hidden on small screens). Use flexbox with space between elements. */}

          <input
            type="text"
            placeholder="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)} 
            // Controlled input for job title. Updates the 'jobTitle' state when the input value changes.

            className="p-2 rounded outline-none border" 
            // Style the input field with padding, border, and rounded corners.
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            // Controlled input for location. Updates the 'location' state when the input value changes.

            className="p-2 rounded outline-none border" 
            // Style the input field similarly to the job title input.
          />

          <select
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)} 
            // Controlled dropdown for selecting the date filter. Updates the 'datePosted' state when the selection changes.

            className="p-2 rounded outline-none border" 
            // Style the dropdown similarly to the input fields.
          >
            <option value="all">All dates</option>
            <option value="today">Today</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
          </select>

          <button className="bg-purple-500 text-white px-4 py-2 shadow-2xl rounded hover:bg-purple-300" onClick={handleSearch}> 
            {/* Search button styled with Tailwind CSS. Calls handleSearch when clicked. */}

            Search
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && ( 
          // Conditional rendering: If the mobile menu is open (isMenuOpen is true), display the mobile search form.

          <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 flex flex-col space-y-4"> 
            {/* The mobile menu is displayed as a dropdown (full width), with each input stacked vertically (flexbox, flex-col). */}

            <input
              type="text"
              placeholder="Job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)} 
              // Controlled input for job title in the mobile menu. Updates the 'jobTitle' state.

              className="p-2 rounded outline-none border" 
              // Styled similarly to the desktop version.
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)} 
              // Controlled input for location in the mobile menu. Updates the 'location' state.

              className="p-2 rounded outline-none border" 
              // Styled similarly to the desktop version.
            />

            <select
              value={datePosted}
              onChange={(e) => setDatePosted(e.target.value)} 
              // Controlled dropdown for selecting the date filter in the mobile menu.

              className="p-2 rounded outline-none border" 
              // Styled similarly to the desktop version.
            >
              <option value="all">All dates</option>
              <option value="today">Today</option>
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
            </select>

            <button className="bg-purple-500 hover:bg-purple-300 shadow-md text-white p-2 rounded" onClick={handleSearch}> 
              {/* Search button for mobile. Calls handleSearch when clicked. Styled with hover effect. */}

              Search
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
// Export the Navbar component as the default export.
