    import Link from "next/link";

    export default function Navbar(){
        return(
            <div className=" sticky top-0 z-0 bg-[#AFE1F8] px-12     py-3">
                <Link href={'/'} className="text-lg  font-bold   text-gray-700 px-4">FOLLOWERSNAP</Link>
            </div>
        )
    }