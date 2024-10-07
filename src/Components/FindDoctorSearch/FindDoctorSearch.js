import React, { useState, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import doctorSearchImage from '../../Assets/doctor_search.jpg';
import doctor1 from '../../Assets/doc1.png';
import doctor2 from '../../Assets/doc2.png';
import doctor3 from '../../Assets/doc3.png';
import DoctorCard from '../DoctorCard/DoctorCard';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const doctorImages = [doctor1, doctor2, doctor3];  // Array of doctor images

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        handleSearch(speciality);  // Trigger search after selection
    };

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(doctor =>
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    // Fetch doctors data on component mount
    useEffect(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor</h1>
                <div>
                    <img src={doctorSearchImage} alt="Doctor Search" style={{ width: '320px', height: 'auto' }} />
                </div>

                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="doctor-search-box">
                        <input type="text" className="search-doctor-input-box" placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={() => setDoctorResultHidden(false)}
                            onBlur={() => setDoctorResultHidden(true)}
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                        />

                        <div className="findiconimg">
                            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
                        </div>

                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => (
                                    <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                        <span><img src={doctorSearchImage} alt="" style={{ height: "10px", width: "10px" }} /></span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </center>

            {/* Search Results Section */}
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
                                    location={doctor.location}
                                    experience={doctor.experience}
                                    ratings={doctor.ratings}
                                    profilePic={doctorImages[index] || doctorSearchImage}  // Dynamically pass image or fallback
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
    )
}

export default FindDoctorSearch;
