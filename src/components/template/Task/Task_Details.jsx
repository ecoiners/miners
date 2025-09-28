
const Task_Details = ({ data }) => {
    return (
        <div className="fixed top-0 bg-black z-20">
            <p className="font-roboto text-xs capitalize text-center absolute top-2 left-[50%] -translate-x-[50%] text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text">Tasks</p>

            <div className="mt-10">
                <p className="text-2xl font-roboto font-bold">SFT socials - <span className="text-xl">{data?.data?.length ? data?.data?.length : 0}</span></p>
                <p className="text-[#D9D9D9] font-roboto text-xs">Join SFT community, be aware of new and following updates, claim your reward in rSPD with SFT fam!  </p>
            </div>
        </div>
    );
};

export default Task_Details;