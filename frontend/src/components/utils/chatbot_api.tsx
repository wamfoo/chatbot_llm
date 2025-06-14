export async function fetchChatbotResponse(endpoint: string, message: string): Promise<string> {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch response from backend");
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        return "I'm having trouble responding right now. Please try again later.";
    }
}