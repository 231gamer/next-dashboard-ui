import Image from "next/image"

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4">
            {/* SEARCH BAR  */}
            <div className="hidden md:flex">
                <Image src="/search.png" alt="" width={14} height={14}/>
                <input type="text" name="" id="" placeholder="Search.." />
            </div>
            {/* Icons and User  */}
            <div className=""></div>
        </div>
    )
}

export default Navbar