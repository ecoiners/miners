import Leaderborard from "../components/template/Home/Leaderborard";

const LeaderboardPage = () => {

    return (
        <div className="bg-black min-h-screen">
            <div className="p-3">
                <p className="text-center text-white text-2xl font-montserrat font-bold">Telegram Wall Of Fame</p>
            </div>

            <Leaderborard />
        </div>
    );
};

export default LeaderboardPage;