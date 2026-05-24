---
name: Sovereign AI
colors:
  surface: '#fbf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#fbf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f1'
  surface-container: '#efedec'
  surface-container-high: '#eae8e6'
  surface-container-highest: '#e4e2e0'
  on-surface: '#1b1c1b'
  on-surface-variant: '#544341'
  inverse-surface: '#30302f'
  inverse-on-surface: '#f2f0ee'
  outline: '#877270'
  outline-variant: '#dac1bf'
  surface-tint: '#954742'
  primary: '#2a0002'
  on-primary: '#ffffff'
  primary-container: '#4a0e0e'
  on-primary-container: '#cc726d'
  inverse-primary: '#ffb3ad'
  secondary: '#715858'
  on-secondary: '#ffffff'
  secondary-container: '#fcdbda'
  on-secondary-container: '#775e5e'
  tertiary: '#170e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#322200'
  on-tertiary-container: '#a98742'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#3d0506'
  on-primary-fixed-variant: '#77302d'
  secondary-fixed: '#fcdbda'
  secondary-fixed-dim: '#debfbe'
  on-secondary-fixed: '#281717'
  on-secondary-fixed-variant: '#574141'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fbf9f7'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  mono-data:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap: 120px
  stack-gap-lg: 48px
  stack-gap-md: 24px
  stack-gap-sm: 12px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style

This design system is crafted for a high-seniority AI Product Management portfolio. It balances the intellectual authority of traditional luxury with the forward-leaning nature of artificial intelligence. The aesthetic centers on a **Premium Modern** style—utilizing high-end editorial typography, generous whitespace, and sophisticated glassmorphism to create a "digital atelier" feel.

The emotional response should be one of profound trust, quiet confidence, and technical mastery. By shunning the "neon-and-dark-mode" AI tropes in favor of a warm, organic, and architectural palette, the design system positions the user as a leader who prioritizes human-centric product outcomes over raw technical noise.

## Colors

The palette is anchored in a sophisticated "Tuscan-Industrial" spectrum. 
- **Primary (Maroon):** Used for key headlines and primary actions to convey power and depth.
- **Secondary (Chocolate):** Provides grounding for text and dark-themed structural sections.
- **Neutral (Off-White):** Acts as the primary canvas, ensuring a breathable, high-contrast reading experience.
- **Tertiary/Accent (Gold/Copper):** Reserved exclusively for interactive states (hover, focus), success indicators, and subtle data highlights.

Maintain a "minimalist luxury" ratio: 80% Off-White, 15% Maroon/Chocolate, and 5% Gold/Copper.

## Typography

The typographic hierarchy establishes a dialogue between history and the future. **Playfair Display** provides the authoritative, "Editorial" voice for project titles and page headers. Its high-contrast serifs demand attention and suggest a curated, high-stakes career.

**Sora** acts as the technical counter-balance. Its geometric construction and wide apertures ensure that complex AI product specs and technical methodologies remain highly legible and modern. Use `label-caps` for metadata like "Year" or "Industry" to add a structured, professional layer to the page.

## Layout & Spacing

The design system employs a **Fixed-Fluid Hybrid** grid. On desktop, content is constrained to a 1280px center-aligned container with a 12-column grid. On mobile, it transitions to a single-column layout with 20px margins.

The "Luxury of Space" is a core principle. Section headers should be separated by no less than 120px. Content within project cards should use an 8px base grid for internal padding, ensuring elements never feel crowded. Negative space is not "empty"—it is used to frame the user's expertise as high-value.

## Elevation & Depth

Depth is achieved through **Glassmorphic Stacking** rather than traditional drop shadows.
- **Level 1 (Base):** Off-white background.
- **Level 2 (Cards):** Semi-transparent surfaces (white at 70% opacity) with a `24px` backdrop blur and a very thin `0.5px` border in the primary maroon color (at 10% opacity).
- **Level 3 (Modals/Active):** Higher opacity with a soft, diffused "Ambient" shadow: `0px 20px 40px rgba(45, 27, 27, 0.05)`.

Interactive elements should appear to "lift" slightly on hover using a subtle copper glow (inner shadow) to indicate tactile feedback.

## Shapes

The shape language is defined by **Extended Radii**. While the system uses the `2` (Rounded) variable for standard UI elements like inputs, specific premium components utilize larger radii:
- **Project Cards:** 32px (rounded-3xl)
- **Badges/Chips:** Full pill-shape.
- **Images:** 24px (rounded-2xl)

This softened geometry counters the "sharpness" of the AI subject matter, making the technology feel accessible and human-led.

## Components

### Premium Project Cards
Cards should feature a vertical gradient from transparent to a soft Maroon wash (#4A0E0E at 5%). Titles should be in `headline-md` (Playfair Display) with a metadata row above in `label-caps`.

### Vertical Timeline
The experience section uses a single 1px vertical line in Maroon. Experience "nodes" are 12px circles with a 4px Copper border. The year should be placed in the left margin (desktop) to create an asymmetrical, architectural feel.

### Skill Badges (Pills)
Pill-shaped badges for AI tools (e.g., "PyTorch", "LLM Strategy") should have a background of #F9F7F5 with a 1px border of #4A0E0E at 15% opacity. Text should be `label-caps` for a crisp, technical look.

### Primary Buttons
Buttons are solid Maroon with White text. On hover, they transition to a Copper background with a slight expansion (1.02 scale). Use 1rem (16px) vertical padding and 2.5rem (40px) horizontal padding to maintain the "High-End" footprint.

### Input Fields
Inputs use a minimal bottom-border only approach (1px Maroon) or a very light glassmorphic fill. Focus states are indicated by the border changing to Copper.