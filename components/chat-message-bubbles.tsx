/**
 * Chat Message Bubbles
 * Category: Communication
 * Tags: chat, messages, bubbles, communication, conversation
 * Description: Two-sided chat bubble layout — sent messages on the right in dark, received on the left in light. Timestamp and avatar per sender.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/chat-message-bubbles.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ChatMessageBubbles() {
  const messages = [
    { text: "Hey! Did you see the new button exhibit?", sent: false, time: "10:41" },
    { text: "Just checked it out — looks really clean.", sent: true, time: "10:42" },
    { text: "Right? The ghost variant is chef's kiss 🤌", sent: false, time: "10:42" },
    { text: "Adding it to my collection now.", sent: true, time: "10:43" },
  ];
  return (
    <div className="bg-neutral-50 rounded-xl p-4 space-y-3 max-w-xs">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.sent ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${m.sent ? "bg-neutral-900 text-white rounded-br-sm" : "bg-white border border-neutral-100 text-neutral-700 rounded-bl-sm"}`}>
            {m.text}
            <div className={`text-[10px] mt-1 ${m.sent ? "text-neutral-400" : "text-neutral-300"}`}>{m.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}