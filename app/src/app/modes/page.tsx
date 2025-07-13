'use client'

interface Mode {
    title: string;
    description: string;
    color: string;
}

export default function Modes() {

    const modes: Mode[] = [
        {
            title: '🎮 Rompehielos',
            description: 'Ideal para que todos se conozcan sin filtros y la fiesta arranque con la mejor energía.',
            color: '#B3E0FF'
        },
        {
            title: '🍹 Pre-Peda',
            description: 'Retos perfectos para preparar el ambiente y subir el ánimo antes del desmadre total.',
            color: '#C8F8B8'
        },
        {
            title: '🔥 Peda',
            description: 'Ideal para que todos se conozcan sin filtros y la fiesta arranque con la mejor energía.',
            color: '#FFD1AA'
        },
        {
            title: '🫦 Hot',
            description: 'Retos picantes que desafían la vergüenza, exploran la atracción y suben el voltaje. ¡Atrevimiento garantizado!',
            color: '#F08080'
        },
        {
            title: '❤️‍🔥 Pareja',
            description: 'Retos diseñados para llevar la intimidad, la sensualidad y la confianza de tu relación a otro nivel. ¡Solo para dos y listos para explorar!',
            color: '#FFC0CB'
        },
        {
            title: '🌙 After',
            description: 'Retos para el bajón, confesiones de madrugada y la mejor forma de cerrar la noche o seguirle hasta el amanecer.',
            color: '#D8BFD8'
        },
    ]

    const selectMode = (mode: Mode) => {
        localStorage.setItem('mode', JSON.stringify(mode));
        window.location.href = '/configuration';
    }

    return (<div className="bg-[#2C2C2C] h-full min-h-screen text-white flex flex-col items-center justify-center">
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 text-center mt-4">
                    <h2 className="text-4xl font-bold text-white">Party Flow</h2>
                </div>
            </div>
            <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                {modes.map((mode, index) => (
                    <div key={index} className="w-full cursor-pointer" onClick={() => selectMode(mode)}>
                        <div className="card shadow py-8 max-sm:py-56 px-8 h-full flex flex-col justify-center rounded-lg" style={{ backgroundColor: mode.color }}>
                            <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">{mode.title}</h2>
                            <p className="text-base text-[#2C2C2C]">{mode.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>);
}