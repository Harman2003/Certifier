import React from 'react';
import CertIcon from "@/assets/certificate.svg?react";
import EventIcon from "@/assets/event.svg?react";
import ValidateIcon from "@/assets/validation.svg?react";
import DashCard from '@/components/utils/DashCard';
const CardContainer = () => {
  return (
    <div className="col-span-6 flex gap-3 text-gray-700">
      <DashCard head={"Total Certificates"} value={10511} isIncreasing={true} Icon={CertIcon} change='15%'/>
      <DashCard head={"Total Events"} value={100} isIncreasing={false} Icon={EventIcon} change='5%'/>
      <DashCard head={"Total Validations"} value={25000} isIncreasing={true} Icon={ValidateIcon} change='20%'/>
    </div>
  );
}

export default CardContainer
