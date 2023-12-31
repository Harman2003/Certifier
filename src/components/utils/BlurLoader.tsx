import { useEffect, useState } from 'react'
import { Triangle } from "react-loader-spinner";
import Typewriter from "typewriter-effect";
const BlurLoader = () => {
    const [visible, setvisible] = useState<boolean>(true);
    
    useEffect(() => {
        const timer=setTimeout(() => setvisible(false), 5000);
         return () => {
           clearTimeout(timer);
         };
    },[])
    return (
      visible && (
        <div className="fixed top-0 w-full h-full backdrop-blur-md z-[999] flex flex-col items-center justify-center gap-4">
          <Triangle
            height="80"
            width="80"
            color="rgb(34,197,94)"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className="text-3xl font-Nunito font-semibold text-gray-600 flex gap-2">
            <div>Create your own certificates using our</div>
            <div className="text-gray-800 font-bold">
              <Typewriter
                options={{
                  strings: ["Template Editor", "Certify Editor"],
                  autoStart: true,
                  loop: true,
                  delay: 20,
                  deleteSpeed: 20,
                }}
              />
            </div>
          </div>
        </div>
      )
    );
}

export default BlurLoader



