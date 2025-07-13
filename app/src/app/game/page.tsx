'use client'

import { useEffect, useState } from "react";

interface Reto {
    id: number;
    descripcion: string;
    participantes_asignados: string[];
}

interface Mode {
    title: string;
    description: string;
    color: string;
}


export default function Game() {

    const [retos, setRetos] = useState<Reto[]>();

    const [indexReto, setIndexReto] = useState<number>(0);
    const [vibe, setVibe] = useState<string>("relajado");
    const [mode, setMode] = useState<Mode>();

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
            setMode(JSON.parse(storedMode));
        }
    }, []);

    useEffect(() => {
        openModal();
    }, [])

    const openModal = () => {
        const modal = document.getElementById('vibesIA') as HTMLDialogElement
        modal?.showModal();
    }

    const generateChallenges = async () => {

        setIndexReto(0);

        fetch("http://192.168.0.161:3000/api/challenges/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mode: mode?.title,
                    participants: JSON.parse(localStorage.getItem("participants") || "[]"),
                    place: localStorage.getItem("place"),
                    personality: JSON.parse(localStorage.getItem("personality") || "{}"),
                    vibe: vibe
                })
            }
        ).then(response => response.json())
            .then(data => {
                console.log(data);
                setRetos(data);

            }).catch(error => {
                console.error("Error al obtener retos:", error);
            });
    }

    const updateVibesIA = (e: any) => {
        setVibe(e.target.value);
    }

    const next = () => {
        if (retos!.length - 1 > indexReto) {
            setIndexReto(indexReto + 1);
        } else {
            openModal();
        }
    }

    return (<>
        {retos && retos.length > 0 ? (
            <div className="bg-[#2C2C2C] h-full min-h-screen text-white flex flex-col items-center justify-center">
                <div className="container mx-auto">
                    <div className="flex max-sm:flex-wrap gap-4 justify-center mb-4 mx-4">
                        <div className="w-1/4 max-sm:w-full">
                            <div className="card shadow py-8 max-sm:py-18 px-8 h-full flex flex-col justify-center rounded-lg" style={{ backgroundColor: mode?.color }}>
                                <p className="text-xl text-[#2C2C2C]">{retos[indexReto].descripcion}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex max-sm:flex-wrap justify-center mx-4">
                        <div className="w-1/4 max-sm:w-full mb-4">
                            <button
                                className="btn bg-[#C500CF] border-none shadow-none text-white rounded-full px-5 py-6 w-full text-xl" onClick={next}>
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center">
                <div className="container mx-auto">
                    <div className="flex max-sm:flex-wrap gap-4 justify-center mb-4 mx-4">
                        <div className="w-1/4 max-sm:w-full">
                            <p>Cargando...</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <dialog id="vibesIA" className="modal">
            <div className="modal-box w-11/12 max-w-sm bg-[#2C2C2C] text-white">
                <h3 className="font-bold text-lg">Vibes IA</h3>
                <p className="py-4">Hey! Aqui Vibes IA, dime como se encuentra el ambiente para poder ajustar los retos:</p>
                <div className="flex">
                    <div className="w-full">
                        <select className="select rounded shadow w-full bg-[#2C2C2C] border-[#4D4C4C] text-white focus:outline-none mt-2" onChange={updateVibesIA} value={vibe}>
                            <option value="relajado">Relajado</option>
                            <option value="publico dificil">Publico dificil</option>
                            <option value="ambientados">Ambientados</option>
                            <option value="pedos">Pedos</option>
                            <option value="cansados (after)">Cansados (After)</option>
                        </select>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn bg-[#C500CF] border-none shadow-none text-white rounded-full" onClick={generateChallenges}>Actualizar</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>);
}