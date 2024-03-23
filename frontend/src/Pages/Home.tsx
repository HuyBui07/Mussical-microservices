import NavBar from "../Components/NavBar";

export default function Home() {
    return (
      <>
      <div className="m-2 mb-8 lg:ml-[315px] bg-zinc-800 h-[80%] " style={{ borderRadius: '10px' }}>
          <NavBar/>
          <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />

      </div>
      <div className="mx-2 mt-[-25px] lg:ml-[315px] bg-zinc-800 h-[17%] " style={{ borderRadius: '10px' }}>
          
      </div>
      </>
      
    );
  }
  