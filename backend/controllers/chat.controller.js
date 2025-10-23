import { generateStreamToken } from "../src/config/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const token = await generateStreamToken(req.auth().userId);
        res.status(200).json({ token });
    } catch (error) {
        console.log("Error in getStreamToken controller:", error); 
        res.status(500).json({ error: "Failed to generate Stream token" });
    }
    
};
