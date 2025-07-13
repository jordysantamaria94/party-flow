'use client'

import { useState } from "react";
import { set } from "react-hook-form";

interface Personality {
    id: number;
    nombre: string;
    palabras_clave: string[];
    vibe: string;
    modos_sugeridos: string;
}

export default function Configuration() {

    const personalities: Personality[] = [
        {
            id: 1,
            nombre: "El Compadre Fiestero",
            palabras_clave: ["Energía", "ambiente", "desinhibición", "inicio de fiesta"],
            vibe: "¡Qué onda, mi gente! El Compadre Fiestero ya llegó para prender el desmadre. ¡Échenle ganas, que la noche apenas empieza y esto se va a poner bueno!",
            modos_sugeridos: "Rompehielos, Pre-Peda, Peda (especialmente al inicio o para revivir el ánimo)"
        },
        {
            id: 2,
            nombre: "La Jefa Pícara",
            palabras_clave: ["Audacia", "coquetería", "sensualidad", "conexión íntima"],
            vibe: "Aquí la Jefa soy yo, y hoy venimos a jugar sin miedo. ¿Listos para cruzar esa línea? No te me rajes, que la noche es joven y la tentación es grande.",
            modos_sugeridos: "Hot, Pareja, Peda (para un toque más atrevido)"
        },
        {
            id: 3,
            nombre: "El Viejo Confiable",
            palabras_clave: ["Calma", "anécdotas", "reflexión", "cierre de fiesta"],
            vibe: "Ya se nos fue la primera, ¿verdad? A ver, siéntense tantito. Este es el momento de las historias, de recordar lo que nos trajo aquí. ¡Suelta la sopa, mijo, que el tiempo vuela!",
            modos_sugeridos: "After, Rompehielos (para un ambiente más relajado), Peda (en fases de bajón o para confesiones)"
        },
        {
            id: 4,
            nombre: "El Mariachi Envalentonado",
            palabras_clave: ["Audacia", "físico", "competencia", "retos extremos"],
            vibe: "¡Arriba esos ánimos, cabrones! Aquí no hay miedo que valga. El que se raje, ¡toma doble y canta 'Cielito Lindo' a capella! ¡A ver de qué cuero salen más correas!",
            modos_sugeridos: "Peda (especialmente en su clímax o cuando el grupo está muy prendido), Hot (para retos más físicos y atrevidos)"
        },
        {
            id: 5,
            nombre: "El Travieso Cachondo",
            palabras_clave: ["Humor negro", "sorpresa", "travesuras", "risas absurdas"],
            vibe: "¡Ji, ji, ji! El Travieso Cachondo ya anda suelto y trae unas cuantas sorpresitas bajo la manga. ¿Creen que lo han visto todo? ¡Prepárense, que la risa les va a salir por donde menos esperan!",
            modos_sugeridos: "Peda (para un ambiente desinhibido y con humor ácido), After (para mantener la diversión con un giro inesperado)"
        },
        {
            id: 6,
            nombre: "El Ritmo Encendido",
            palabras_clave: ["Energía", "flow", "música", "dinamismo", "anfitrión"],
            vibe: "¡Que no pare la fiesta! El Ritmo Encendido llegó para ponerle sabor a cada reto. ¡A moverse, banda, que esto apenas comienza!",
            modos_sugeridos: "Rompehielos, Pre-Peda, Peda"
        },
        {
            id: 7,
            nombre: "El Cerebro de la Peda",
            palabras_clave: ["Estrategia", "ingenio", "lógica", "desafíos mentales", "astucia"],
            vibe: "Piensen bien su siguiente movimiento, porque aquí no todo es beber. El Cerebro de la Peda les trae retos que los harán pensar... ¡si es que pueden con el nivel!",
            modos_sugeridos: "Peda (para un giro intelectual), Rompehielos (más analítico), After (para debates divertidos)"
        },
        {
            id: 8,
            nombre: "El Rey del Relajo",
            palabras_clave: ["Bromas", "diversión", "caos controlado", "humor espontáneo", "desorden"],
            vibe: "¡Aquí llegó su Rey del Relajo! Prepárense para unas cuantas risas... y quizás uno que otro susto. ¡A ver quién se la aguanta y sigue el juego!",
            modos_sugeridos: "Rompehielos, Peda, After"
        },
        {
            id: 9,
            nombre: "La Madrina del Desvelo",
            palabras_clave: ["Cuidado", "apoyo", "recuperación", "anécdotas finales", "despedida"],
            vibe: "Ya la noche se nos fue, pero la Madrina del Desvelo está aquí para que cerremos con broche de oro. ¡Un último brindis por esta peda inolvidable y por lo que venga!",
            modos_sugeridos: "After, Rompehielos (para un ambiente de apoyo y conexión)"
        },
        {
            id: 10,
            nombre: "La Sombra del Reto",
            palabras_clave: ["Misterio", "impredecible", "giros", "sorpresas", "oscuridad divertida"],
            vibe: "No saben lo que les espera... La Sombra del Reto se mueve en la oscuridad, y sus desafíos son tan impredecibles como la noche misma. ¿Se atreven a descubrir qué les depara?",
            modos_sugeridos: "Peda (para un giro oscuro y emocionante), Hot (misterio y tensión), After (sorpresas finales)"
        }
    ]

    const [personality, setPersonality] = useState<Personality>(personalities[0]);
    const [place, setPlace] = useState<string>("casa");

    const selectPersonality = (e: any) => {
        const selected = personalities.find(p => p.id === parseInt(e.target.value));
        setPersonality(selected as Personality);
    }

    const selectPlace = (e: any) => {
        setPlace(e.target.value);
    }

    const startGame = () => {
        localStorage.setItem("place", place);
        localStorage.setItem("personality", JSON.stringify(personality));
        window.location.href = "/game";
    }

    return (<div className="bg-[#2C2C2C] h-full min-h-screen text-white">
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 text-center mt-8">
                    <h2 className="text-4xl font-bold text-white">Configuration</h2>
                </div>
            </div>
            <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4 max-sm:w-full">
                    <h2 className="text-lg font-semibold">Lugar</h2>
                    <p className="text-sm mb-2">Ajustaremos los retos al lugar donde te encuentres</p>
                    <select className="select rounded shadow w-full bg-[#2C2C2C] border-[#4D4C4C] text-white focus:outline-none mt-2" onChange={selectPlace} value={place}>
                        <option value="casa">Casa</option>
                        <option value="bar">Bar</option>
                        <option value="antro">Antro</option>
                    </select>
                </div>
            </div>
            <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4 max-sm:w-full">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">Vibes IA</h2>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" disabled />
                    </div>
                    <p className="text-sm">Deja que la IA ajuste los retos
                        dependiendo como este el ambiente.
                        (Más energia, necesitamos un descanso,
                        el grupo esta muy timido)</p>
                </div>
            </div>
            {/* <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4">
                    <div className="flex justify-between mb-4">
                        <h2>Anonymity/consent</h2>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                    </div>
                    <p>Permitir al usuario poner 2 preferencias o
                        aversiones, para ajustar los retos a cada uno.(No me gusta cantar, me gusta mucho bailar)</p>
                </div>
            </div> */}
            <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4 max-sm:w-full">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">Funny mode</h2>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" disabled />
                    </div>
                    <p className="text-sm">Agrega consecuencias divertidas.
                        (Para evitar todo el tiempo tomar shot)</p>
                </div>
            </div>
            {/* <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4">
                    <div className="flex justify-between mb-4">
                        <h2>Storyteller Final</h2>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                    </div>
                    <p>Mostrar un resumen de los retos al final de
                        la partida</p>
                </div>
            </div> */}
            <div className="flex max-sm:flex-wrap gap-4 justify-center my-8 mx-4">
                <div className="w-1/4 max-sm:w-full">
                    <h2 className="text-lg font-semibold">Personality</h2>
                    <p className="text-sm mb-4">Asigna una personalidad para que te guie en estos retos.</p>
                    <select className="select rounded shadow w-full bg-[#2C2C2C] border-[#4D4C4C] text-white focus:outline-none mt-2" onChange={selectPersonality} value={personality ? personality.id : ''}>
                        {personalities.map((personality) => (
                            <option key={personality.id} value={personality.id}>
                                {personality.nombre}
                            </option>
                        ))}
                    </select>
                    <p className="text-lg font-semibold mt-4">Vibe:</p>
                    <p className="text-sm mt-2">{personality.vibe}</p>
                    <p className="text-lg font-semibold mt-2">Modos seguridos:</p>
                    <p className="text-sm mt-2">{personality.modos_sugeridos}</p>
                </div>
            </div>
            <div className="flex max-sm:flex-wrap justify-center mx-4">
                <div className="w-1/4 max-sm:w-full mb-12">
                    <button
                        className="btn bg-[#C500CF] border-none shadow-none text-white rounded-full px-5 py-6 w-full text-xl"
                        onClick={startGame}>
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    </div>);
}