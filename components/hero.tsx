"use client"

export default function Hero(){

    const handleFollow = () => {
        window.open(
          "https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Enutri1498811&screen_name=Thotsem22",
          "", "width=300, height=300");
      };

    return(
        <main className="flex flex-col gap-4 justify-center items-center">
            <h1 className=" text-yellow-300 font-semibold">FOLLOW HAHAHA</h1>
            <span onClick={handleFollow} className=" cursor-pointer px-4 py-2 bg-white text-black">
            Tap to Follow
            </span>
        </main>
    )
}