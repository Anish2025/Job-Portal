import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// Import React Router components for handling navigation: Router wraps the entire app, Route defines individual routes, and Routes wraps all the routes.

import { useState } from 'react'; 
// Import the useState hook from React to manage state within the component.

import HomePage from './pages/HomePage'; 
// Import the HomePage component from the 'pages' directory.

import JobDetailsPage from './pages/JobDetailsPage'; 
// Import the JobDetailsPage component from the 'pages' directory.

import Navbar from './components/Navbar'; 
// Import the Navbar component from the 'components' directory.

const App = () => { 
  // Define the main functional component 'App' for the application.

  const [searchParams, setSearchParams] = useState({ jobTitle: 'developer', location: '', datePosted: 'all' }); 
  // Declare the state variable 'searchParams' with initial values: a default 'jobTitle' of 'developer', an empty 'location', and 'datePosted' set to 'all'. The 'setSearchParams' function updates this state.

  const handleSearch = (params, navigate) => { 
    // Define a function 'handleSearch' that accepts 'params' (new search parameters) and 'navigate' (function to navigate programmatically).

    setSearchParams(params); 
    // Update the 'searchParams' state with the new 'params' received from the search input.

    // Redirect to homepage after search
    navigate('/'); 
    // Use the 'navigate' function to programmatically redirect to the homepage ("/") after a search is submitted.
  };

  return (
    <Router> 
      {/* Wrap the entire application inside the Router component to enable routing. */}

      <Navbar onSearch={handleSearch} /> 
      {/* Render the Navbar component, passing the 'handleSearch' function as a prop. */}

      <Routes> 
        {/* Define the set of routes inside the Routes component. */}

        <Route path="/" element={<HomePage searchParams={searchParams} />} /> 
        {/* Define the route for the homepage ("/"). When this route is visited, render the HomePage component and pass 'searchParams' as a prop. */}

        <Route path="/job/:id" element={<JobDetailsPage />} /> 
        {/* Define the route for job details page ("/job/:id"). The ':id' is a dynamic parameter in the URL, and the JobDetailsPage component is rendered when this route is accessed. */}

      </Routes>

    </Router>
  );
};

export default App; 
// Export the 'App' component as the default export of the file.
