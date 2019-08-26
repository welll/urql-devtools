import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import React, {
  createContext,
  useEffect,
  FC,
  useRef,
  useCallback,
  useState
} from "react";
import { DevtoolsPanelConnectionName, PanelOutgoingMessage } from "../../types";

interface DevtoolsContextType {
  sendMessage: (message: PanelOutgoingMessage) => void;
  addMessageHandler: (
    cb: (message: DevtoolsExchangeOutgoingMessage) => void
  ) => () => void;
  clientConnected: boolean;
}

export const DevtoolsContext = createContext<DevtoolsContextType>(null as any);

export const DevtoolsProvider: FC = ({ children }) => {
  const [clientConnected, setClientConnected] = useState(false);
  const connection = useRef(
    chrome.runtime.connect({ name: DevtoolsPanelConnectionName })
  );

  /** Collection of operation events */
  const messageHandlers = useRef<
    Record<string, (msg: DevtoolsExchangeOutgoingMessage) => void>
  >({});

  const sendMessage = useCallback<DevtoolsContextType["sendMessage"]>(
    msg => connection.current.postMessage(msg),
    []
  );

  const addMessageHandler = useCallback<
    DevtoolsContextType["addMessageHandler"]
  >(callback => {
    const i = index++;
    messageHandlers.current[i] = callback;

    return () => {
      delete messageHandlers.current[i];
    };
  }, []);

  useEffect(() => {
    // Relay the tab ID to the background page
    connection.current.postMessage({
      type: "init",
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    const handleMessage = (msg: DevtoolsExchangeOutgoingMessage) =>
      Object.values(messageHandlers.current).forEach(h => h(msg));

    connection.current.onMessage.addListener(handleMessage);
    return () => connection.current.onMessage.removeListener(handleMessage);
  }, []);

  // Listen for client init connection
  useEffect(() => {
    addMessageHandler(
      message => message.type === "init" && setClientConnected(true)
    );
    addMessageHandler(
      message => message.type === "disconnect" && setClientConnected(false)
    );
  }, [addMessageHandler, setClientConnected]);

  return (
    <DevtoolsContext.Provider
      value={{ sendMessage, addMessageHandler, clientConnected }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;
