const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// LA LLAVE SE CONFIGURA EN EL PANEL DE RENDER/RAILWAY (Variable de entorno)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/preguntar', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = req.body.prompt;
        
        // Instrucción Maestra de K.B TECH
        const result = await model.generateContent(`Actúa como el motor de IA de K.B TECH. Responde de forma breve y profesional. Pregunta: ${prompt}`);
        const response = await result.response;
        res.json({ respuesta: response.text() });
    } catch (error) {
        res.status(500).json({ error: "Error en el cerebro central" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cerebro Beta activo en puerto ${PORT}`));
