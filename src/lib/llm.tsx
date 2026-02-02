import knowledge from "./knowledge.json";

export async function askAI(userInput: string): Promise<string> {
  const response = await fetch("https://portifolio-g4ty.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });
  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}`);
  }
  const data = await response.json();
  const aiText = data?.response || "Sorry, I couldn't help with that.";
  const greetingRegex = /^(hi|hello|hey|greetings|e|^$)/i;
  const helpMsg = "\n\nType 'help' to see what you can do here!";
  const shouldAppendHelp = greetingRegex.test(userInput.trim());
  return `🟣 Regis: ${aiText}${shouldAppendHelp ? helpMsg : ""}`;
}
