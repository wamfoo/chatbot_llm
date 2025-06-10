"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

import { ChatMessageBubble } from "./ChatMessageBubble";
import { FaRobot } from "react-icons/fa6";

import { fetchChatbotResponse } from "./utils/chatbot_api";

import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ChatWindow(props: {
  endpoint: string;
  placeholder?: string;
  titleText?: string;
  aiIcon?: string;
  humanIcon?: string;
  chatIcon?: string;
  initialMessage?: string;
  uploadEndpoint?: string;
  showUpload?: boolean;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const [messages, setMessages] = useState<
    { id: string; content: string; createdAt: Date; role: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [chatEndpointIsLoading, setChatEndpointIsLoading] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const themeChangeHandler = (e: { matches: any }) =>
      setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", themeChangeHandler);
    setTheme(mediaQuery.matches ? "dark" : "light");
    return () => mediaQuery.removeEventListener("change", themeChangeHandler);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const isMobile = window.innerWidth <= 768;

  const chatWindowStyles: CSSProperties = {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: theme === "dark" ? "#333333" : "white",
    color: theme === "dark" ? "#fff" : "#000",
    position: "fixed",
    bottom: isMobile ? "160px" : "100px",
    right: isMobile ? "60px" : "40px",
    borderRadius: "10px",
    width: isMobile ? "90%" : "400px",
  };

  const {
    endpoint,
    placeholder,
    aiIcon,
    humanIcon,
    chatIcon,
    titleText,
    initialMessage,
  } = props;

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  useEffect(() => {
    if (!messages.length) {
      messages.push({
        id: "initial",
        content: initialMessage || "Hi, how may I help you?",
        createdAt: new Date(Date.now()),
        role: "assistant",
      });
    }
  }, []);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: input,
      createdAt: new Date(Date.now()),
      role: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setChatEndpointIsLoading(true);

    try {
      const response = await fetchChatbotResponse(endpoint, newMessage.content);
      if (response) {
        const aiMessage = {
          id: "bot" + crypto.randomUUID(),
          content: response,
          createdAt: new Date(Date.now()),
          role: "assistant",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessage = {
        id: "bot-error" + crypto.randomUUID(),
        content: "I'm having trouble responding right now. Please try again later.",
        createdAt: new Date(Date.now()),
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatEndpointIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {chatIcon ?? <FaRobot />}
      </button>
      <div style={chatWindowStyles}>
        {isChatOpen && (
          <>
            <div
              className="chat-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{titleText}</div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <button onClick={toggleTheme} className="theme-toggle-button">
                  <div
                    className={
                      theme === "dark"
                        ? "icon-wrapper"
                        : "icon-wrapper dark-mode"
                    }
                  >
                    {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
                  </div>
                </button>
              </div>
            </div>
            <div className="chat-container">
              <div ref={messageContainerRef}>
                {messages.length > 0
                  ? [...messages].map((m, i) => (
                      <ChatMessageBubble
                        key={m.id}
                        message={m}
                        aiIcon={aiIcon}
                        humanIcon={humanIcon}
                      />
                    ))
                  : ""}
              </div>
            </div>
          </>
        )}

        {isChatOpen && (
          <form onSubmit={sendMessage} className="form-container">
            <div className="chat-input">
              <textarea
                className="input-field"
                value={input}
                placeholder={placeholder ?? "Type your message here..."}
                onChange={(e) => {
                  setInput(e.target.value);

                  const lineHeight = parseInt(
                    window.getComputedStyle(e.target).lineHeight,
                  );
                  const contentHeight = e.target.scrollHeight;
                  if (contentHeight > lineHeight && contentHeight > 32) {
                    const newHeight = Math.min(contentHeight, 96);
                    e.target.style.height = `${newHeight}px`;
                  } else {
                    e.target.style.height = "32px";
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    const form = e.currentTarget.form;
                    if (form) form.requestSubmit();
                  }
                }}
                rows={1}
                style={{ height: "32px" }}
              />
              <button type="submit" className="submit-button">
                {chatEndpointIsLoading ? (
                  <div role="status" className="flex justify-center">
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}