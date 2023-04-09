import React from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import CoachCard from '../../components/CoachCard/CoachCard';
import AddContentHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';

interface ICoachData {
  name: string,
  profession: string
}

const coachData: ICoachData[] = [
  {
    "name": "Ona Bailey",
    "profession": "Electrical Engineering Technician"
  },
  {
    "name": "Prof. Myrl Kshlerin",
    "profession": "Answering Service"
  },
  {
    "name": "Laurine Weimann",
    "profession": "Rock Splitter"
  },
  {
    "name": "Trudie McKenzie",
    "profession": "Roofer"
  },
  {
    "name": "Prof. Aisha McKenzie DDS",
    "profession": "Food Batchmaker"
  },
  {
    "name": "Axel Gusikowski V",
    "profession": "Septic Tank Servicer"
  },
  {
    "name": "Mrs. Dorothy Dooley IV",
    "profession": "Financial Specialist"
  },
  {
    "name": "Dr. Bradly Hermiston",
    "profession": "Pressing Machine Operator"
  },
  {
    "name": "Dr. Milo Rogahn",
    "profession": "Emergency Management Specialist"
  },
  {
    "name": "Dr. Brando Spinka",
    "profession": "Electronics Engineer"
  },
  {
    "name": "Marilyne Schumm",
    "profession": "Fraud Investigator"
  },
  {
    "name": "Eleanora Moore",
    "profession": "Central Office"
  },
  {
    "name": "Mrs. Esther Olson V",
    "profession": "Nursing Aide"
  },
  {
    "name": "Nathan Borer I",
    "profession": "Production Inspector"
  },
  {
    "name": "Marlin Yundt",
    "profession": "Payroll Clerk"
  },
  {
    "name": "Raul Dicki",
    "profession": "New Accounts Clerk"
  },
  {
    "name": "Marlin Hand",
    "profession": "MARCOM Director"
  },
  {
    "name": "Wilmer Rogahn",
    "profession": "Mathematical Science Teacher"
  },
  {
    "name": "Jimmie Jerde",
    "profession": "Textile Knitting Machine Operator"
  },
  {
    "name": "Prof. Lawrence Quigley",
    "profession": "Public Transportation Inspector"
  },
  {
    "name": "Alexys Borer",
    "profession": "Printing Machine Operator"
  },
  {
    "name": "Molly Reinger",
    "profession": "Order Clerk"
  },
  {
    "name": "Reuben Runolfsson III",
    "profession": "Tool Sharpener"
  },
  {
    "name": "Damion Schaefer",
    "profession": "Valve Repairer OR Regulator Repairer"
  },
  {
    "name": "Mr. Chester Dickinson",
    "profession": "Meat Packer"
  },
  {
    "name": "Crawford Ankunding",
    "profession": "Stonemason"
  },
  {
    "name": "Javonte Harris",
    "profession": "Political Scientist"
  },
  {
    "name": "Floy Satterfield",
    "profession": "Plastic Molding Machine Operator"
  },
  {
    "name": "Norberto Champlin",
    "profession": "Bench Jeweler"
  },
  {
    "name": "Dr. Audreanne Dach Jr.",
    "profession": "Airfield Operations Specialist"
  },
  {
    "name": "Eliza Erdman",
    "profession": "Human Resources Manager"
  },
  {
    "name": "Rozella Friesen I",
    "profession": "Forging Machine Setter"
  },
  {
    "name": "Miss Alice Reilly",
    "profession": "Nuclear Technician"
  },
  {
    "name": "Mr. Martin McGlynn Sr.",
    "profession": "Private Sector Executive"
  },
  {
    "name": "Sandrine Schimmel",
    "profession": "Lawn Service Manager"
  },
  {
    "name": "Ms. Effie Bahringer Sr.",
    "profession": "Forensic Science Technician"
  }
]

const Coaches = () => {

  const navigate = useNavigate()
  function simple() {
    navigate("/coaches/add");
  }

  return (
    <div className='flex w-screen h-screen'>
      {/* Navbar */}
      <Nav pageName='Antrenörler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <AddContentHeader pageName='Antrenörler' addContent='Antrenör Ekle' addContentIcon={<RiAccountCircleLine className='h-8 w-8' />} addContentAction={simple} />
        <div className='p-10 flex flex-wrap gap-16 justify-center' style={{ height: 'auto', overflowY: 'scroll' }}>
          {coachData.map(coach =>
            <CoachCard name={coach.name} profession={coach.profession} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Coaches