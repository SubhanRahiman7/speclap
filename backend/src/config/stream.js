import {StreamChat} from "stream-chat";
import {ENV} from "../config/env.js";

const StreamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
    try {
        await StreamClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData.name);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await StreamClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        return StreamClient.createToken(userIdString);
    } catch (error) {
        console.error("Error generating Stream token:", error);
        return null;
    }
}

export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({ discoverable: true });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};
