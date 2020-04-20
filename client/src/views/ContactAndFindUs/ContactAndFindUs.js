import React from 'react';
import { Link } from 'react-router-dom';
import './ContactAndFindUs.css';
import Map from '../../components/Map/Map.js';

const ContactAndFindUs = () => {
  return (
    
    <div className='App'>
      <Map />
      <header className='App-header'>
        <h1> Address</h1>
        <h2> UF Health Neurosurgery – Neuromedicine Hospital</h2>
        <p>1505 SW Archer Road Gainesville, FL 32608 Phone: 352-273-6990</p>
        UF Health Neurosurgery – Neuromedicine Hospital is located in
        Gainesville, Fla., on the University of Florida campus off of Archer
        Road (SR 24), about three miles east of I-75, exit 384, and one block
        west of U.S. Hwy 441.
        
        <h2> Directions</h2>
        <h3> From I-75</h3>
        Take exit 384 to Gainesville/Archer. Head east on Archer Road for
        approximately 3 miles. For main entrance — take a right at The Circle of
        Hope and a left immediately after into valet/patient drop-off. For the
        parking garage — take a right at SW 13th Street and another right onto
        13th Avenue. Park in the garage on your right.
        <h3>From South or North 441 (13th Street)</h3>
        From U.S. Highway 441/13th Street: For main entrance — head west on
        Archer Road. Take a left at The Circle of Hope and a left immediately
        after into valet/patient drop-off. For the parking garage — From U.S.
        441/13th Street, turn onto SW 13th Avenue. Park in the garage on your
        right.
        <h2>Parking</h2>
        Valet parking is available in the front circle of the hospital ($3 with
        a patient or patient visitor parking voucher). Patients and visitors
        must ask for a parking voucher at the check-out area, nurses’ station or
        other designated area when leaving their location of service and present
        it to the attendant upon exiting the garage. Please be advised that
        parking is cash only. If patients or visitors do not wish to valet, a
        600-space parking garage is available adjacent to the hospital. A
        covered walkway from the garage leads into the lobby of the building.
        Courtesy Shuttle Links and Admissions
        <h3> More Links to Directions and Maps</h3>
        Admitting Information for Stroke Patients and Families
        <h2>Lodging</h2>
        Where can I stay while my family member or friend is a patient at Shands
        at UF? Most of the area hotel and motel establishments in Gainesville
        will offer family and friends of patients a discount. UF Health Shands
        Hospital Admissions Desk will be happy to provide you with a current
        list of these establishments. VisitGainesville.com: Places to stay in
        Gainesville
        <h2>Transportation</h2>
        Gainesville Regional Airport Air Charity Network (877) 621-7177
        Gainesville Bus Schedules (RTS)
      </header>
    </div>
  );
}

export default ContactAndFindUs;
