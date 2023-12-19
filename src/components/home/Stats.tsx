import React from 'react'
import styles from '@/pages/Home/style'
import { stats } from '@/constants'
const Stats = () => {
  return (
    <section className="flex justify-center items-start flex-row flex-wrap sm:mb-20 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="flex-1 flex items-center flex-col m-3">
          <h4 className="font-Poppins font-semibold text-[30px] leading-[43px] xs:text-[40px] xs:leading-[53px] text-white">
            {stat.value}
          </h4>
          <p className="font-Poppins font-normal text-[15px] leading-[21px] xs:text-[20px] xs:leading-[26px] text-gradient uppercase ml-3">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Stats
