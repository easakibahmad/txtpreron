import Message from "../models/Message.js";

const getChatHistoryService = async (myId: string, otherId: string) => {
  return await Message.find({
    $or: [
      { sender: myId, receiver: otherId },
      { sender: otherId, receiver: myId },
    ],
  }).sort({ timestamp: 1 });
};

export { getChatHistoryService };
