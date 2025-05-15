import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="flex justify-center">
            <div className="mt-8">
                <p className="text-white/60 mb-2">Agende, acompanhe, economize tempo</p>
                <h1 className="text-[#A363F0] font-semibold text-[24px] text-semibold mb-12">AgendEI</h1>
                <p className="size-[16px] text-[white] w-full">O que você procura?</p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <Link to="/agendamento">
                        <div className="bg-[#2D2D2D] w-40 h-31.25 rounded-lg shadow-md p-6 flex justify-center items-center">
                            <p className="text-white text-center">Agendamento</p>
                        </div>
                    </Link>
                    <Link to="/fila">
                        <div className="bg-[#2D2D2D] w-40 h-31.25 rounded-lg shadow-md p-6 flex justify-center items-center">
                            <p className="text-white text-center">Acompanhar fila</p>
                        </div>
                    </Link>
                    <div className="bg-[#2D2D2D] w-40 h-31.25 rounded-lg shadow-md p-6 flex justify-center items-center">
                        <p className="text-white text-center">Atendimento prioritário</p>
                    </div>
                    <div className="bg-[#2D2D2D] w-40 h-31.25 rounded-lg shadow-md p-6 flex justify-center items-center">
                        <p className="text-white text-center">Histórico</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;