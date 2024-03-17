import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = () => {
    return (
        <div className="border-b border-gray-200 bg-[#000000] px-6 py-4">
            <div className="flex items-center space-x-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#FFFFFF]" />
                <input className="flex-1 text-white placeholder-[#ffffff] bg-[#000000] outline-none" type="text" placeholder="Search" />
            </div>
        </div>
    )
}

export default SearchBar
