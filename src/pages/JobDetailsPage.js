import { useParams, useLocation, useNavigate } from 'react-router-dom'; 
// Import React Router hooks: useParams to get URL parameters, useLocation to access current URL info, and useNavigate for programmatic navigation.

import { useEffect, useState } from 'react'; 
// Import React hooks: useEffect for side effects (like fetching data) and useState for managing component state.

import axios from 'axios'; 
// Import Axios for making HTTP requests.

import JobSkeleton from '../components/JobdetailsSkeleton'; 
// Import JobSkeleton component to display a loading skeleton while the job details are being fetched.

import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
// Import specific icons (left arrow and right arrow) from the React Icons library.

const JobDetailsPage = () => { 
  // Define the JobDetailsPage component.

  const { id } = useParams(); 
  // Get the 'id' parameter from the URL (used to fetch the specific job details).

  const location = useLocation(); 
  // Get the current location object which contains state information (e.g., which page the user came from).

  const navigate = useNavigate(); 
  // Get the navigate function to programmatically navigate between routes.

  const [job, setJob] = useState(null); 
  // Define the 'job' state to store the fetched job details. Initially set to 'null'.

  useEffect(() => { 
    // useEffect hook to run the code when the component mounts or when the 'id' parameter changes.

    const fetchJobDetails = async () => { 
      // Define an asynchronous function to fetch the job details.

      try { 
        // Start a try block to handle potential errors during data fetching.

        const response = await axios.get('https://jsearch.p.rapidapi.com/job-details', { 
          // Make an HTTP GET request to the API for job details using Axios.

          params: { job_id: id }, 
          // Pass the 'id' from the URL as a query parameter to get the specific job's details.

          headers: { 
            // Set the required headers for API access.

            'X-RapidAPI-Key': "62842c4798msh0b5025c8dd8f8e0p1ec9ccjsnab57e3758dd0", 
            // Include the RapidAPI key from environment variables for authentication.

            'X-RapidAPI-Host': "jsearch.p.rapidapi.com", 
            // Include the RapidAPI host from environment variables.

          },
        });

        setJob(response?.data?.data?.[0]); 
        // Update the 'job' state with the fetched job data (first job in the data array).

      } catch (error) { 
        // Catch and handle any errors that occur during the API request.

        console.error('Error fetching job details:', error); 
        // Log the error message if fetching fails.

      }
    };

    fetchJobDetails(); 
    // Call the fetchJobDetails function when the component mounts or the 'id' changes.

  }, [id]); 
  // The useEffect hook will re-run if the 'id' parameter changes.

  if (!job) return <JobSkeleton/>; 
  // If the 'job' data is still being fetched (i.e., job is null), render the JobSkeleton component as a placeholder.

  const jobDescriptionLines = job.job_description.split('\n').map((line, index) => ( 
    // Split the job description by new lines and map over each line to create a separate <p> element for each.

    <p key={index} className="mb-2">{line}</p> 
    // Render each line of the job description as a paragraph with a bottom margin.
  ));

  return (
    <> 
    {/* React fragment to wrap the returned JSX */}

    <div className="container mx-auto mt-16 p-8"> 
      {/* Container for the job details page, styled using Tailwind CSS classes. */}

      <button 
        className="bg-purple-500 text-white p-2 rounded mb-4 px-4 flex shadow-md"
        // Button styled with Tailwind CSS classes.

        onClick={() => navigate(location.state?.currentPage ? `/page/${location.state.currentPage}` : '/')} 
        // Navigate back to the previous page (if the current page exists in location.state), or back to the home page.

      >
        <FaArrowLeft className='mt-[3px] pr-2 text-xl'/>Back 
    {/*     // Display a left arrow icon and the "Back" text inside the button. */}
      </button>

      <div className="bg-white p-6 rounded"> 
        {/* Card-like div for job details, styled with Tailwind CSS. */}

        <h1 className="text-2xl font-bold mb-4 text-gray-700 job-title">{job.job_title}</h1> 
        {/* Render the job title in bold, large text. */}

        <p className="mb-2 text-gray-700 card-detail">Employer: {job.employer_name}</p> 
        {/* Render the employer name. */}

        <p className="mb-2 text-gray-700 card-detail">Location: {job.job_city}, {job.job_state}</p> 
        {/* Render the job location (city and state). */}

        <p className="mb-2 text-gray-700 card-detail">Type: {job.job_employment_type}</p> 
        {/* Render the job type (e.g., full-time, part-time). */}

        <p className="mb-4 text-gray-700 card-detail">Posted on: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}</p> 
        {/* Convert and render the job posting date as a human-readable date. */}

        <h3 className="text-lg  mb-2 text-gray-700 card-details">Job Description:</h3> 
        {/* Render a subtitle for the job description section. */}

        <p className='card-detail text-sm'>{jobDescriptionLines}</p> 
        {/* Render the formatted job description (with each line as a separate paragraph). */}
        
      </div>
     
    </div>

    <a
     href={job.job_apply_link} 
     // Render an anchor tag for the job application link.

     className="bg-purple-500 text-white px-4 rounded ml-8 flex mb-8 w-32 cursor-pointer hover:bg-blue-300 card-detail shadow-md"
     // Style the "Apply Now" button with Tailwind CSS.

     target="_blank" 
     // Open the job application link in a new tab.

     rel="noopener noreferrer" 
     // Prevents security issues related to external links.

   >
     Apply Now<FaArrowRight className='mt-[14px] text-xl'/> 
  {/*    // Display "Apply Now" text and a right arrow icon. */}
   </a>

   </>
  );
};

export default JobDetailsPage; 
// Export the JobDetailsPage component as the default export.
