/**
 * EcoPulse AI — useAICoach Hook
 * Simulated AI chatbot with context-aware responses.
 * Uses pattern matching on user messages to generate relevant suggestions.
 */

import { useState, useCallback } from 'react';
import type { ChatMessage, ChatSession } from '../types';
import { MessageSender } from '../types';
import { useApp } from '../contexts/AppContext';
import { sanitizeHTML } from '../utils/validators';

/** Generate a unique message ID */
function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** AI response database organized by topic keywords */
const AI_RESPONSES: Record<string, { reply: string; suggestions: string[] }[]> = {
  greeting: [
    {
      reply: "Hello! 👋 I'm your EcoPulse AI sustainability coach. I can help you understand your carbon footprint, suggest eco-friendly habits, and guide you toward a greener lifestyle. What would you like to explore today?",
      suggestions: ['Show my carbon score', 'Suggest daily habits', 'How can I reduce emissions?'],
    },
  ],
  carbon_score: [
    {
      reply: "Your carbon score is a measure of your annual CO₂ emissions based on your lifestyle choices across transportation, energy, food, shopping, waste, and water usage. A lower score means a smaller environmental impact. Would you like to retake the assessment or see tips for improvement?",
      suggestions: ['Retake assessment', 'Show improvement tips', 'Compare to average'],
    },
  ],
  transportation: [
    {
      reply: "🚗 Transportation is often the biggest contributor to carbon footprint! Here are some high-impact changes:\n\n1. **Carpool or use rideshare** — cuts emissions by 50%\n2. **Switch to public transit** — buses and metros produce 80% less CO₂ per passenger\n3. **Cycle for short trips** — zero emissions + great exercise!\n4. **Consider an EV** when it's time for a new vehicle\n\nEven 2 car-free days per week can save ~500 kg CO₂ annually!",
      suggestions: ['Tell me about EVs', 'Cycling tips', 'Public transport benefits'],
    },
  ],
  food: [
    {
      reply: "🥗 Food choices have a huge impact! Here's what the data shows:\n\n• **Beef produces 27 kg CO₂ per kg** — that's 20x more than lentils!\n• Going **meatless 1 day/week** saves ~200 kg CO₂/year\n• **Local & seasonal** food reduces transport emissions by 10-15%\n• **Reducing food waste** can save ~250 kg CO₂/year\n\nTry starting with Meatless Mondays — it's a small change with big impact!",
      suggestions: ['Plant-based recipes', 'Reduce food waste', 'Local food sources'],
    },
  ],
  energy: [
    {
      reply: "⚡ Energy efficiency at home is a great place to start:\n\n1. **Switch to LED bulbs** — use 75% less energy\n2. **Set AC to 24°C** instead of 18°C — saves 36% energy\n3. **Unplug standby devices** — phantom power adds up!\n4. **Consider rooftop solar** — government subsidies make it affordable\n5. **Use 5-star rated appliances** — 30-50% more efficient\n\nA typical household can cut electricity bills by 20-30% with these steps.",
      suggestions: ['Solar panel info', 'Appliance efficiency', 'Energy audit tips'],
    },
  ],
  waste: [
    {
      reply: "♻️ Reducing waste is easier than you think:\n\n1. **Segregate waste** — wet, dry, recyclable. This alone diverts 60% from landfills\n2. **Carry reusables** — bottle, bag, cup. No more single-use plastic!\n3. **Start composting** — kitchen scraps become garden gold\n4. **Buy in bulk** — less packaging waste\n5. **Repair before replacing** — extend the life of your belongings\n\nThe average person generates ~1.5 kg of waste daily. Let's bring that down!",
      suggestions: ['Composting guide', 'Zero-waste tips', 'Recycling dos & donts'],
    },
  ],
  water: [
    {
      reply: "💧 Water conservation saves both water and the energy used to pump and heat it:\n\n1. **5-minute showers** save 25+ liters per shower\n2. **Fix leaky taps** — a drip wastes 20,000 liters/year\n3. **Low-flow fixtures** reduce usage by 30-50%\n4. **Rainwater harvesting** for garden use\n5. **Full loads only** for washing machine and dishwasher",
      suggestions: ['Water-saving fixtures', 'Rainwater harvesting', 'Garden water tips'],
    },
  ],
  habits: [
    {
      reply: "📋 Building eco-friendly habits is the most sustainable way to reduce your footprint! Here are great daily habits to start:\n\n• 🍶 Carry a reusable water bottle\n• 🚌 Use public transport or cycle\n• 🥗 Have one plant-based meal\n• 💡 Turn off lights when leaving rooms\n• 🚿 Take shorter showers\n• 🛍️ Refuse plastic bags\n\nTrack these in your Habits page to build streaks and earn eco-points!",
      suggestions: ['Start tracking habits', 'See my streaks', 'Add custom habit'],
    },
  ],
  motivation: [
    {
      reply: "🌟 Every small action counts! Here's some perspective:\n\n• If everyone reduced meat intake by 25%, it would save the equivalent emissions of taking 25 million cars off the road\n• A single tree absorbs ~22 kg of CO₂ per year\n• Your daily eco-habits can save 1-2 tonnes of CO₂ annually\n\nYou're already ahead by being here and caring about the planet! Keep going — consistency beats perfection. 💪🌍",
      suggestions: ['Show my progress', 'Weekly challenge', 'Share achievements'],
    },
  ],
  default: [
    {
      reply: "That's a great question! I can help you with:\n\n🌍 **Carbon footprint** — understanding your impact\n🚗 **Transportation** — greener commute options\n🥗 **Food & diet** — sustainable eating\n⚡ **Energy** — saving electricity at home\n♻️ **Waste** — reduce, reuse, recycle\n💧 **Water** — conservation tips\n📋 **Habits** — building eco-friendly routines\n🏆 **Challenges** — fun weekly goals\n\nWhat topic interests you?",
      suggestions: ['Transportation tips', 'Food & diet', 'Energy saving', 'Daily habits'],
    },
  ],
};

/** Match user message to a topic */
function detectTopic(message: string): string {
  const lower = message.toLowerCase();

  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy)/.test(lower)) return 'greeting';
  if (/carbon\s*score|footprint|assessment|impact|emissions?/i.test(lower)) return 'carbon_score';
  if (/transport|car|drive|commut|bus|metro|train|flight|cycle|bike|ev|electric\s*vehicle/i.test(lower)) return 'transportation';
  if (/food|eat|diet|meat|vegan|vegetarian|cook|meal|restaurant/i.test(lower)) return 'food';
  if (/energy|electricity|power|solar|ac|air\s*condition|appli|led|bulb|light/i.test(lower)) return 'energy';
  if (/waste|trash|recycl|compost|plastic|garbage|segregat|reuse/i.test(lower)) return 'waste';
  if (/water|shower|tap|leak|rain|irrigation|conserv/i.test(lower)) return 'water';
  if (/habit|daily|routine|track|streak|activity/i.test(lower)) return 'habits';
  if (/motivat|inspir|why|worth|impact|difference|help|point/i.test(lower)) return 'motivation';

  return 'default';
}

export function useAICoach() {
  const { state: appState } = useApp();
  const [session, setSession] = useState<ChatSession>({
    messages: [
      {
        id: generateId(),
        sender: MessageSender.AI,
        content: `Welcome to EcoPulse AI! 🌍 I'm your personal sustainability coach. ${appState.user ? `Nice to meet you, ${appState.user.name}!` : ''} Ask me anything about reducing your carbon footprint, or pick a topic below to get started.`,
        timestamp: new Date().toISOString(),
        suggestions: ['Show my carbon score', 'Suggest daily habits', 'How can I reduce emissions?', 'What are eco-points?'],
      },
    ],
    isTyping: false,
    context: {
      lastTopic: '',
      userPreferences: [],
      recentActions: [],
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      const sanitized = sanitizeHTML(content.trim());
      if (!sanitized) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        sender: MessageSender.User,
        content: sanitized,
        timestamp: new Date().toISOString(),
      };

      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true,
      }));

      // Simulate AI thinking delay
      const delay = 800 + Math.random() * 1200;
      setTimeout(() => {
        const topic = detectTopic(sanitized);
        const responses = AI_RESPONSES[topic] || AI_RESPONSES.default;
        const response = responses[Math.floor(Math.random() * responses.length)];

        const aiMessage: ChatMessage = {
          id: generateId(),
          sender: MessageSender.AI,
          content: response.reply,
          timestamp: new Date().toISOString(),
          suggestions: response.suggestions,
        };

        setSession((prev) => ({
          ...prev,
          messages: [...prev.messages, aiMessage],
          isTyping: false,
          context: {
            ...prev.context,
            lastTopic: topic,
          },
        }));
      }, delay);
    },
    []
  );

  const clearChat = useCallback(() => {
    setSession({
      messages: [
        {
          id: generateId(),
          sender: MessageSender.AI,
          content: 'Chat cleared! How can I help you today? 🌱',
          timestamp: new Date().toISOString(),
          suggestions: ['Carbon footprint tips', 'Daily habits', 'Weekly challenges'],
        },
      ],
      isTyping: false,
      context: { lastTopic: '', userPreferences: [], recentActions: [] },
    });
  }, []);

  return {
    messages: session.messages,
    isTyping: session.isTyping,
    sendMessage,
    clearChat,
  };
}
