import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, Navigate } from 'react-router-dom';
import doctorSearchImage from '../../Assets/doctor_search.jpg';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    }
    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor</h1>
                {/* Replace Font Awesome Icon with Image */}
                <div>               
                    <img src={doctorSearchImage} alt="Doctor Search" style={{width: '320px', height: 'auto'}} />
                </div>

                <div className="home-search-container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                        <input type="text" className="search-doctor-input-box" placeholder="Search doctors, clinics, hospitals, etc." 
                            onFocus={() => setDoctorResultHidden(false)} 
                            onBlur={() => setDoctorResultHidden(true)} 
                            value={searchDoctor} 
                            onChange={(e) => setSearchDoctor(e.target.value)} 
                        />

                        <div className="findiconimg">
                        <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/>
                        </div>

                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => (
                                    <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                        <span><img src={doctorSearchImage} alt="" style={{height:"10px", width:"10px"}} width="12" /></span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default FindDoctorSearch;