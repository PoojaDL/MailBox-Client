import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
  name: "sent",
  initialState: { sentMessage: [], totalSentMessages: 0, unreadMails: 0 },
  reducers: {
    addSentMail(state, action) {
      state.sentMessage = action.payload;
      state.totalSentMessages = Object.keys(state.sentMessage).length;
      let count = 0;
      const totalUnread = Object.keys(state.sentMessage).map((key) => {
        if (!state.sentMessage[key].read) {
          count++;
        }
        return count;
      });
      // eslint-disable-next-line
      totalUnread;
      state.unreadMails = count;
    },
    newSentMessage(state) {
      state.totalSentMessages++;
    },
  },
});

export const sentActions = sentSlice.actions;

export default sentSlice;
