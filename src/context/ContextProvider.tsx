import { useContext, useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export type MessageType = "Message" | "Successful" | "Error";

export type DialogAction = "DELETE" | "ADD";

export interface DialogMessage {
  id?: string;
  message: string;
  messageType: MessageType;
}

export interface DialogMessageShort{
  message:string,
  messageType: MessageType
}

const dialogMessageInitState = new Array<DialogMessage>();

const dialogMessagesHandler = (
  state: Array<DialogMessage>,
  action: { type: DialogAction; messages: DialogMessage }
) => {
  switch (action.type) {
    case "ADD":
      return state.concat([action.messages]);
    case "DELETE":
      return state.filter((dialog) => {
        return dialog.id !== action.messages.id;
      });
    default:
      return state;
  }
};

/**
 * Initial value of the context
 */
const contextInitValue = {
  token: "",
  setToken: (token: string) => {},
  dialogMessages: new Array<DialogMessage>(),
  addDialogMessages: (
    messages: DialogMessage | Array<DialogMessage>
  ) => {},
  deleteDialogMessages: (
    messages: DialogMessage | Array<DialogMessage>
  ) => {},
};


const StateContext = createContext(contextInitValue);

/**
 * 
 * @param props 
 * @returns 
 */
export const ContextProvider = (props: {
  children: React.JSX.Element;
}) => {
  // const [token, _setToken] = useState(123);
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") ?? ""
  );
  const [dialogMessages, dialogHandler] = useReducer(
    dialogMessagesHandler,
    dialogMessageInitState
  );
  const setToken = (token: string) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  /**
   * Adds a message or messages to the popup dialog screen
   * @param messages message or messages to be added, either a single object or array of object
   * @returns 
   */
  const addDialogMessages = (
    messages: DialogMessage | Array<DialogMessage>
  ) => {
    if(Array.isArray(messages)){
        messages.forEach(message => {

            dialogHandler({type: "ADD", messages: {...message, id: uuidv4()}})
        })

        return
    }

    dialogHandler({type: "ADD", messages: {...messages, id: uuidv4()}})
  };

  /**
   * Removes a message from Popup Dialog Screen
   * @param messages - message or messages to be remove, either a single object or array of object
   * @returns 
   */
  const deleteDialogMessages = (
    messages: DialogMessage | Array<DialogMessage>
  ) => {
    if(Array.isArray(messages)){
        messages.forEach(message => {

            dialogHandler({type: "DELETE", messages: {...message, id: uuidv4()}})
        })

        return
    }

    dialogHandler({type: "DELETE", messages: {...messages, id: uuidv4()}})
  };

  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        dialogMessages,
        addDialogMessages,
        deleteDialogMessages
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

/**
 * 
 * @return token login access token
 * @return setToken used to set the token once a response is made from the server
 * @return dialogMessages list of popup dialog messages
 * @return addDialogMessages function for adding popup dialog message
 * @return deleteDialogMessage function for removing popup dialog messages
 * 
 */
export const useStateContext = () => useContext(StateContext);
