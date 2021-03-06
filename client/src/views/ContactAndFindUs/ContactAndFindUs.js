import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './ContactAndFindUs.css';
import Map from '../../components/Map/Map.js';
import { Card, Collapse } from 'antd';
const { Panel } = Collapse;

const ContactAndFindUs = () => {
  return (
    <div>
      <Card bordered={false} style={{ alignSelf: 'center' }}>
        <Collapse accordion>
          <Panel header='Address' key='1'>
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
              <h3> UF Health Neurosurgery – Neuromedicine Hospital</h3>
              <p>
                1505 SW Archer Road <p>Gainesville, FL 32608</p>
              </p>
              UF Health Neurosurgery – Neuromedicine Hospital is located in
              Gainesville, Fla., on the University of Florida campus off of
              Archer Road (SR 24), about three miles east of I-75, exit 384, and
              one block west of U.S. Hwy 441.
            </div>
          </Panel>
          <Panel header='Phone Number' key='2'>
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
              Referrals (New Patients):{' '}
              <a href='tel:352-273-6990'>352-273-6990</a>
              <p>
                Main Office: <a href='tel:352-273-9000'>352-273-9000</a>
              </p>
            </div>
          </Panel>
          <Panel header='Parking' key='3'>
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
              Valet parking is available in the front circle of the hospital ($3
              with a patient or patient visitor parking voucher). Patients and
              visitors must ask for a parking voucher at the check-out area,
              nurses’ station or other designated area when leaving their
              location of service and present it to the attendant upon exiting
              the garage. Please be advised that parking is cash only. If
              patients or visitors do not wish to valet, a 600-space parking
              garage is available adjacent to the hospital. A covered walkway
              from the garage leads into the lobby of the building. Courtesy
              Shuttle Links and Admissions
            </div>
          </Panel>
          <Panel header='Transportation' key='4'>
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
              Gainesville Regional Airport Air Charity Network{' '}
              <a href='tel:877-621-7177'>877-621-7177</a>
              Gainesville Bus Schedules (RTS)
            </div>
          </Panel>
        </Collapse>
      </Card>
      <Card
        bordered={false}
        style={{ justifyContent: 'center', textAlign: 'center' }}
      >
        <Button
          type='primary'
          onClick={() => {
            window.open(
              'https://www.google.com/maps/dir//1505+SW+Archer+Rd,+Gainesville,+FL'
            );
          }}
        >
          Open Directions in Google Maps
        </Button>

        <p> </p>
        <p>
          <Map />
        </p>
      </Card>
    </div>
  );
};

export default ContactAndFindUs;

