import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';  // Use existing styling
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';  // Import FindDoctorSearch
import DoctorCard from './DoctorCard/DoctorCard';  // Import DoctorCard

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([]);  // Store all doctors
  const [filteredDoctors, setFilteredDoctors] = useState([]);  // Store filtered doctors
  const [isSearched, setIsSearched] = useState(false);

  // Fetch doctors from API
  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };

  // Handle search based on speciality
  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  // Fetch doctors on component mount
  useEffect(() => {
    getDoctorsDetails();
  }, []);

  return (
    <center>
      <div className="searchpage-container">
        {/* Include search component */}
        <FindDoctorSearch onSearch={handleSearch} />

        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>{filteredDoctors.length} doctors are available</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <DoctorCard
                    key={doctor.name}
                    name={doctor.name}
                    speciality={doctor.speciality}
                    experience={doctor.experience}
                    ratings={doctor.ratings}
                    profilePic={`./Assets/doc${index + 1}.png`}  // Display the doctor's image
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            ''
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
