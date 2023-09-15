import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: { inboxMessage: [], totalInboxMessages: 0, unreadMails: 0 },
  reducers: {
    addInboxMail(state, action) {
      state.inboxMessage = action.payload;
      state.totalInboxMessages = Object.keys(state.inboxMessage).length;
      let count = 0;
      const totalUnread = Object.keys(state.inboxMessage).map((key) => {
        if (!state.inboxMessage[key].read) {
          count++;
        }
        return count;
      });
      // eslint-disable-next-line
      totalUnread;
      state.unreadMails = count;
    },
    newInboxMessage(state) {
      state.totalInboxMessages++;
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice;
