# 🌍 EcoPulse AI — Carbon Footprint Tracker & Sustainability Coach

EcoPulse AI is an interactive, gamified web application designed to help users calculate, track, and systematically reduce their carbon footprint. Powered by client-side heuristic intelligence, the application guides users from a comprehensive lifestyle assessment through to personalized action plans, daily habit streaks, and an AI-driven coaching interface.

---

## 🚀 1. Chosen Challenge Vertical
**Vertical:** Sustainability & Carbon Footprint Tracking (Gamified Personal Coach)
**Design Persona:** Sleek, modern, and engaging. Designed with dark-mode glassmorphic cards, emerald accent colors, and custom micro-animations (float, pulse, glow) that convey ecological vitality while providing an extremely premium dashboard feel on desktop.

---

## 📊 2. Approach & Calculation Logic

The core carbon calculator is implemented in `src/utils/carbonCalculator.ts`. It processes multi-step assessment answers to build a comprehensive view of the user's annual CO₂ equivalent (CO₂e) emissions.

### Calculation Formulas
1. **Per-Answer Annual Contribution:**
   $$\text{Annual Contribution} = \text{User Value} \times \text{Emission Factor} \times \text{Weight}$$
   - *User Value*: Selected option value or numerical input (e.g., commute distance, geyser heater type).
   - *Emission Factor*: Extrapolated annual CO₂e impact coefficient per activity unit.
   - *Weight*: Factor importance adjustment multiplier.

2. **Carbon Score (0–100 Scale):**
   $$\text{Score} = \min\left(100, \text{round}\left(\frac{\text{Total Annual Emissions}}{2 \times \text{National Average}}\right) \times 100\right)$$
   - Lower scores are better (reflecting lower impact). A score below 3,000 kg CO₂e is classified as **Low Impact**, 3,000–6,000 kg as **Moderate**, and above 6,000 kg as **High**.

3. **Comparison to National Average:**
   $$\text{Comparison \%} = \text{round}\left(\frac{\text{Total Annual} - \text{National Average}}{\text{National Average}} \times 100\right)$$
   - Reference points: Indian national average of **1,900 kg CO₂e/year** and global average of **4,700 kg CO₂e/year** (stored in `src/utils/constants.ts`).

---

## 🛠️ 3. How the Solution Works

### A. Onboarding & Multi-Step Assessment
- **Onboarding:** Simple input screen with XSS-safe name validation.
- **Categorized Assessment:** Covers 6 core categories (Transportation, Electricity, Food, Shopping, Waste, Water) across 24 questions.
- **Dynamic Controls:** Features slider components for linear metrics (kilometers, hours, bags) and styled radio lists for qualitative inputs.

### B. Interactive Dashboard
- **Recharts Visualizations:**
  - *Emission Breakdown Donut Chart*: Shows percentage and weight distribution per category.
  - *Weekly Carbon Trend Area Chart*: Plots daily carbon tracking data with smooth gradients.
- **Comparison Indicators:** Compares the user's footprint against global and national averages using responsive progress meters.
- **Achievements Summary:** Displays Level progress, badges unlocked, and total eco-points.

### C. Gamification & Streaks
- **Eco-Points (XP):** Earned by completing assessments (+50), completing daily habits (+10), completing custom actions (+30), and finishing weekly challenges (+50).
- **Badge Unlocks:** 17+ badges stored in `src/data/badges.ts` (e.g., "Early Adopter", "Streak Master", "Low Carbon Champion") unlock dynamically upon meeting thresholds.
- **Sustainability Levels:** 10 levels from *Seedling* to *Earth Hero* based on cumulative eco-points.

### D. AI Sustainability Coach (Chatbot)
- **Heuristic Pattern-Matching Engine:** Detects intents (energy, waste, food, etc.) using client-side token regex mapping.
- **Interactive Suggestions:** Offers chip recommendations to click and continue the learning flow.
- **Typing Indicator & Micro-interactions:** Bounces dots during "thinking" delays to simulate high-fidelity coach interactions.

---

## 📦 4. Tech Stack & Project Architecture

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** TailwindCSS v4 with `@tailwindcss/vite` (utilizing CSS variables for rapid compilation)
- **Icons:** `lucide-react`
- **Charts:** `recharts` for performance-optimized SVG charts
- **Linting:** ESLint flat config + type-aware rules
- **State Management:** Localized Context API (`AppContext`, `AssessmentContext`, `HabitContext`, `GamificationContext`) keeping DOM tree updates clean and modular.

### File Structure Map
```text
src/
├── assets/        # Media assets and default illustrations
├── components/
│   ├── common/    # Button, Card, Badge, ProgressBar UI components
│   └── layout/    # Navbar, Sidebar, PageContainer templates
├── contexts/      # AppContext, AssessmentContext, HabitContext, GamificationContext
├── data/          # Questions, challenges, badges, action plans, and emission factors
├── hooks/         # useAICoach chatbot hook
├── pages/         # Landing, Assessment, Dashboard, Chatbot, Habits, ActionPlan, Achievements, Settings
├── types/         # TypeScript type interfaces
└── utils/         # Carbon calculations, validators, formatters, and local storage helpers
```

---

## 💡 5. Key Assumptions

- **Emission Database:** Factors are based on global standard reports (IPCC/EPA/DEFRA) localized to representative metrics (e.g., standard Indian electrical grid emissions are estimated at $0.82 \text{ kg CO}_2\text{e/kWh}$).
- **Habit Tracking Daily Reset:** Completed habits are saved to `localStorage` and reset on a new calendar day based on local client system time.
- **Chatbot Offline Context:** The chatbot simulation runs entirely client-side, avoiding latency, ensuring 100% data privacy, and keeping network request load at zero.

---

## 🔒 6. Security & Accessibility Focus

- **Input Sanitization:** Custom validator sanitizes user names and chat inputs to escape HTML special characters (`<`, `>`, `&`, `"`, `'`, `/`), mitigating Cross-Site Scripting (XSS).
- **WAI-ARIA Attributes:** Form inputs (sliders, radio groups) use proper `aria-label`, `aria-checked`, `role="radio"`, and `aria-live` blocks for screen readers.
- **Performance:** Optimized bundle size (under 1MB), with zero external API dependencies for calculations, ensuring fast loads and high Lighthouse scores.
