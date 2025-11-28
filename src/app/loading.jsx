export default function Loading(){
      return <div className="h-screen w-screen bg-white fixed top-0 left-0 z-[2000] inset-0 flex flex-col items-center justify-center">
            <img  src={'/images/logo.png'} alt="Loading - Lavish Whim" className="w-[5em] h-[5em]"/>
            <h3>Loading...</h3>
      </div>
}