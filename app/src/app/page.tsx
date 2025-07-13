'use client'

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddParticipant = (data: any) => {
    const { participant } = data;
    if (participant.trim() !== "") {
      setParticipants([...participants, participant]);
      reset();
    }
  }

  const handleRemoveParticipant = (index: number) => {
    participants.splice(index, 1);
    setParticipants([...participants]);
  }

  const nextStep = () => {
    
    if (participants.length < 2) {
      alert("Por favor, añade al menos dos participante.");
      return;
    }

    localStorage.setItem("participants", JSON.stringify(participants));
    window.location.href = "/modes";
  }

  return (
    <div className="bg-[#2C2C2C] h-full min-h-screen text-white flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2 max-sm:w-3/4 text-center mt-4">
            <h2 className="text-7xl max-sm:text-4xl font-bold text-white">Party Flow</h2>
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <form onSubmit={handleSubmit(handleAddParticipant)} className="w-1/4 max-sm:w-3/4 flex justify-between gap-4">
            <input type="text" {...register("participant", { required: true, minLength: 3 })} className="input rounded-full w-full bg-[#2C2C2C] border-[#4D4C4C] text-white focus:outline-none text-lg p-6" placeholder="Nombre del participante" autoComplete="off" />
            <button type="submit" className="btn bg-[#C500CF] border-none shadow-none text-white rounded-full px-5 py-6">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
        <div className="flex gap-4 justify-center mt-5">
          <div className="w-1/4 max-sm:w-3/4">
            <button className="btn bg-[#C500CF] border-none shadow-none text-white rounded-full px-5 py-6 w-full text-xl" onClick={() => nextStep()}>
              Comenzar
            </button>
          </div>
        </div>
        {participants.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="w-1/4">
              <p className="font-bold text-lg">Participantes</p>
            </div>
          </div>
        )}
        <div className="flex gap-4 justify-center mt-4">
          <div className="w-1/4 max-sm:w-3/4">
            <div className="flex max-sm:flex-wrap gap-4">
              {participants.map((p, index) => (
                <div key={index} className="bg-[#4D4C4C] text-white w-auto rounded-full px-4 py-2 flex items-center justify-between gap-3">
                  <label>{p}</label>
                  <i className="fa-solid fa-xmark text-[#1A1A1A] cursor-pointer" onClick={() => handleRemoveParticipant(index)}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
