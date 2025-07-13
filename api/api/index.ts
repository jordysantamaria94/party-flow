import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyBHM3wd5r0fmCEvR7NbanEEjB0cvjeeUWA";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

app.post("/api/challenges/generate", async (req: Request, res: Response) => {
  try {
    const { mode, participants, personality, place, vibe } = req.body;

    const prompt = `Genera 10 retos para mi aplicación "Party Flow".
      El modo de juego es "${mode}" y el estado actual de la fiesta es "${vibe}".
      El lugar donde se realizará es "${place}".
      La personalidad de la IA deseada es "${personality.nombre}".

      Los participantes son los siguientes: ${participants.join(", ")}.
      Es obligatorio que en cada reto participen todos los integrantes del grupo, o que la asignación de participantes sea lógica y variada si el reto lo permite.
      Asegúrate de que los retos no se repitan con los generados previamente en esta conversación.

      Para cada reto, la naturaleza del desafío puede ser una combinación de:
      - Verdad o Reto
      - Verdad o Shot
      - Únicamente un Reto (con un castigo o shot si no se cumple)
      - Únicamente una Pregunta (con un castigo o shot si no se responde)

      Devuelve la respuesta en formato JSON con la siguiente estructura completa para cada reto:
      \`\`\`json
      {
        "id": [Número consecutivo único],
        "descripcion": "[Descripción del reto, incluyendo instrucciones y quiénes participan]",
        "participantes_asignados": ["ParticipanteA", "ParticipanteB", "..."], // O "Todos", "Uno al azar", "En parejas"
      }
      \`\`\`
    `;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de la API de Gemini:", errorData);
      return res.status(response.status).json({
        error: "Error al comunicarse con la API de Gemini",
        details: errorData,
      });
    }

    const result = await response.json();

    res.send(JSON.parse(result.candidates[0].content.parts[0].text));
  } catch (error) {
    res.send(error);
  }
});

export default app;