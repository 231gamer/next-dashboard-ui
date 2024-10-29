import Announcement from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"
import EventCalender from "@/components/EventCalendar"
import Image from "next/image"

const StudentPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* Left  */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="font-semibold text-xl">Schedule (4A)</h1>
                    <BigCalendar />
                    {/* <Image src="/moreDark.png" alt="" width={20} height={20}/>  */}
                </div>
            </div>
            {/* Right  */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalender />
                <Announcement />
            </div>
        </div>
    )
}

export default StudentPage