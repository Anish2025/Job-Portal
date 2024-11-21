import { useEffect, useState } from 'react'; 
// Import React hooks: useEffect for side-effects and useState for managing component state.

import axios from 'axios'; 
// Import Axios, a library used to make HTTP requests.

import JobCard from '../components/JobCard'; 
// Import JobCard component to display individual job listings.

import Pagination from '../components/Pagination'; 
// Import Pagination component for handling pagination on the page.

import Skeleton from '../components/HomeSkeleton'; 
// Import Skeleton component to show loading placeholders while data is being fetched.

const HomePage = ({ searchParams }) => { 
  // Define a functional component named HomePage, which accepts 'searchParams' as props.

  const [jobs, setJobs] = useState([]); 
  // Create a state variable 'jobs' initialized to an empty array. 'setJobs' is used to update this state.

  const [currentPage, setCurrentPage] = useState(1); 
  // Create a state variable 'currentPage' initialized to 1. 'setCurrentPage' updates the current page for pagination.

  const [loading, setLoading] = useState(false); 
  // Create a state variable 'loading' to track if the data is being fetched. Initially set to false.

  useEffect(() => { 
    // useEffect is used to run the code when the component mounts or when the dependencies change (searchParams, currentPage).

    const fetchJobs = async () => { 
      // Define an asynchronous function to fetch job data from an external API.

      setLoading(true); 
      // Set 'loading' to true before starting the data fetching process.

      try { 
        // Start a try block to handle potential errors during the data fetch.

        const response = await axios.get('https://jsearch.p.rapidapi.com/search', { 
          // Make an HTTP GET request to the job search API using Axios.

          params: { 
            // Pass query parameters from searchParams and the current page number to the API request.

            query: `${searchParams.jobTitle} in ${searchParams.location}`, 
            // The job title and location are combined to form the search query.

            date_posted: searchParams.datePosted, 
            // Include date_posted from searchParams to filter by when the jobs were posted.

            page: currentPage, 
            // The current page number is passed for pagination.

          },

          headers: { 
            // Set the required headers for the API request.

            'X-RapidAPI-Key': "62842c4798msh0b5025c8dd8f8e0p1ec9ccjsnab57e3758dd0", 
            // Include the RapidAPI key from environment variables for API authentication.

            'X-RapidAPI-Host': "jsearch.p.rapidapi.com", 
            // Include the RapidAPI host from environment variables.

          },
        });

        if (response.data.data) { 
          // Check if the response contains job data.
        
          setJobs(response.data.data); 
          // Update the jobs state with the fetched job data.

        } else { 
          // If the response does not contain the expected data, log an error.

          console.error('Error: No jobs field in response'); 
          // Log an error message if the 'data' field is missing.

        }

      } catch (error) { 
        // Catch and handle any errors that occur during the API request.

        console.error('Error fetching jobs:', error); 
        // Log the error message.

      } finally { 
        // Finally block is always executed, regardless of success or failure.

        setLoading(false); 
        // Set 'loading' to false after the data fetch is completed or an error occurs.

      }
    };

    fetchJobs(); 
    // Call the fetchJobs function to fetch the job data when the component mounts or when dependencies change.

  }, [searchParams, currentPage]); 
  // useEffect dependencies: it will re-run if 'searchParams' or 'currentPage' changes.

  return (
    <div className="container mx-auto mt-20 mb-5"> 
{/*       // Return JSX to render the page. Use Tailwind CSS classes for styling the container. */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4"> 
      {/*   // Define a responsive grid layout for the job cards with different column settings for different screen sizes. */}

        {loading ? ( 
          // Conditional rendering: if 'loading' is true, show the Skeleton components.

          Array.from({ length: 8 }, (_, index) => ( 
            // Generate an array of 8 Skeleton components to show loading placeholders.

            <Skeleton key={index} /> 
            // Render a Skeleton component for each placeholder, with a unique key.

          ))
        ) : ( 
          // Else, if not loading, show the actual job cards or a message if no jobs are found.

          jobs.length > 0 ? ( 
            // If jobs are available, map through the jobs array and display a JobCard for each job.

            jobs.map((job) => ( 
              <JobCard key={job.job_id} job={job} /> 
              // Render the JobCard component, passing the job data and a unique key for each job.
            ))
          ) : ( 
            // If no jobs are found, display a message.

            <p>No jobs found</p> 
            // Display "No jobs found" if the jobs array is empty.

          )
        )}
      </div>

      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} /> 
      {/* // Render the Pagination component. Pass the current page and a function to update the current page when clicked.
 */}
    </div>
  );
};

export default HomePage; 
// Export the HomePage component as the default export.
