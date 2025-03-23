const CTA = () => {   
  return (     
    <div className="w-full relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden md:overflow-visible max-h-screen flex flex-col items-center justify-center">       
      <div 
        className="md:max-w-[80vw] w-screen md:w-full h-40 md:h-80 lg:h-[700px] blur-[20px] md:blur-[32px] rounded-b-full opacity-60"             
        style={{ background: 'linear-gradient(153deg, #BF9FE7 16.67%, #7F3FBF 100%)' }}>              
      </div>
              
     <div className="max-w-[500px]  mt-40 md:mt-32">
      <div className="absolute top-60   inset-0 flex items-center justify-center lg:mt-24">         
        {[...Array(5)].map((_, i) => (           
          <div              
            key={i}             
            className="absolute rounded-full border-2 border-white/10"             
            style={{                
              width: `${(i + 2) * 140}px`,                
              height: `${(i + 2) * 140}px`,               
              opacity: 0.4 - i * 0.02             
            }}               
          />         
        ))}       
      </div>
     </div>
              
      <div className="relative z-10 flex flex-col items-center h-full text-white text-center w-full space-y-4 md:space-y-6 p-4 mt-20 md:mt-0">         
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold px-2">           
          Unlock a world of connections <br className="hidden sm:block" /> and share your passions.         
        </h2>         
        <p className="text-xl md:text-2xl opacity-80">Your Community Awaits!</p>         
        <button className="bg-[#7F3FBF] text-white rounded-full px-6 md:px-12 py-2 md:py-3 mt-4 md:mt-6 hover:bg-[#9050D5] transition-colors text-sm md:text-base">           
          Get started         
        </button>       
      </div>                  
    </div>     
  ); 
};  

export default CTA;