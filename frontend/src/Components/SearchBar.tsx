import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
export default function SearchBar(): JSX.Element {
    return (
            
<form className="ml-6 mt-4 flex items-center max-w-sm mx-auto w-[500px]">
  <label htmlFor="simple-search" className="sr-only text-white">
    Search
  </label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <MagnifyingGlassIcon className="w-8 text-white"/>

    </div>
    <input
      type="text"
      id="simple-search"
      className="text-white bg-zinc-400 py-2 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12"
      placeholder="Search branch name..."
    />
  </div>
    
</form>
    );
}