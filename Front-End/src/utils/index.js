import { v4 } from "uuid";

export const getItemFromLocalStorage = (name) => localStorage.getItem(name);
export const deleteItemFromLocalStorage = (name) => localStorage.removeItem(name);
export const setItemToLocalStorage = (name, value) => localStorage.setItem(name, value);

export const emailValidation = (email) =>
  !email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const numberRounderHandler = (num) => (Math.round(num * 100 + Number.EPSILON) / 100).toLocaleString("en-US");

export const CHANNEL_TYPE = {
  addChannel: "addChannel",
  channelChangeHandler: "channelChangeHandler",
  removeChannel: "removeChannel",
  setChannelsData: "setChannelsData",
};

export const channelReducer = (state, { type, payload }) => {
  switch (type) {
    case CHANNEL_TYPE.addChannel: {
      return [
        ...state,
        {
          id: v4(),
          name: "",
        },
      ];
    }
    case CHANNEL_TYPE.removeChannel: {
      return state.filter(({ id }) => payload.id !== id);
    }
    case CHANNEL_TYPE.channelChangeHandler: {
      const changedData = state.map(({ id, name }) => {
        const inputData = { id, name };
        if (id === payload.id) {
          inputData.name = payload.value;
        }
        return inputData;
      });

      return changedData;
    }
    case CHANNEL_TYPE.setChannelsData: {
      return payload.channelsData;
    }
    default:
      return state;
  }
};
