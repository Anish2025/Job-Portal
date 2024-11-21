import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // Function to truncate job title if it exceeds 20 characters
  const truncateTitle = (title) => {
    return title.length > 20 ? `${title.slice(0, 20)}...` : title;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 hover:bg-gray-50 transition-all duration-300 ease-in-out transform">
      <img
        src={job.employer_logo}
        alt={job.employer_name}
        className="w-16 h-16 contain rounded-full mb-4"
      />
      {/* Use the truncateTitle function to limit the job title length */}
      <h2 className="text-xl font-bold text-gray-800 job-title">{truncateTitle(job.job_title)}</h2>
      <p className="text-gray-600 card-detail">{job.employer_name}</p>
      <p className="text-gray-500 mb-2 card-detail">{job.job_employment_type}</p>
      <Link to={`/job/${job.job_id}`} className="text-white rounded p-2 mt-4 flex w-28 bg-purple-500 hover:cursor-pointer card-detail">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
