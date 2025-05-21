// List of Google Fonts to use in the editor
export const fonts = [
  { family: 'Arial', value: 'Arial' },
  { family: 'Roboto', value: 'Roboto' },
  { family: 'Open Sans', value: 'Open Sans' },
  { family: 'Lato', value: 'Lato' },
  { family: 'Montserrat', value: 'Montserrat' },
  { family: 'Poppins', value: 'Poppins' },
  { family: 'Source Sans Pro', value: 'Source Sans Pro' },
  { family: 'Raleway', value: 'Raleway' },
  { family: 'Ubuntu', value: 'Ubuntu' },
  { family: 'Playfair Display', value: 'Playfair Display' },
  { family: 'Merriweather', value: 'Merriweather' },
  { family: 'Oswald', value: 'Oswald' },
  { family: 'Roboto Condensed', value: 'Roboto Condensed' },
  { family: 'Source Code Pro', value: 'Source Code Pro' },
  { family: 'Roboto Mono', value: 'Roboto Mono' },
  { family: 'PT Sans', value: 'PT Sans' },
  { family: 'Noto Sans', value: 'Noto Sans' },
  { family: 'Nunito', value: 'Nunito' },
  { family: 'Work Sans', value: 'Work Sans' },
  { family: 'Quicksand', value: 'Quicksand' },
  { family: 'Josefin Sans', value: 'Josefin Sans' },
  { family: 'Mukta', value: 'Mukta' },
  { family: 'IBM Plex Sans', value: 'IBM Plex Sans' },
  { family: 'Rubik', value: 'Rubik' },
  { family: 'Inter', value: 'Inter' },
  { family: 'Mulish', value: 'Mulish' },
  { family: 'Space Grotesk', value: 'Space Grotesk' },
  { family: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
  { family: 'Sora', value: 'Sora' },
  { family: 'Outfit', value: 'Outfit' },
  { family: 'Manrope', value: 'Manrope' },
  { family: 'Be Vietnam Pro', value: 'Be Vietnam Pro' },
  { family: 'Lexend', value: 'Lexend' },
  { family: 'Red Hat Display', value: 'Red Hat Display' },
  { family: 'Public Sans', value: 'Public Sans' },
  // Decorative and Display Fonts
  { family: 'Dancing Script', value: 'Dancing Script' },
  { family: 'Pacifico', value: 'Pacifico' },
  { family: 'Great Vibes', value: 'Great Vibes' },
  { family: 'Satisfy', value: 'Satisfy' },
  { family: 'Lobster', value: 'Lobster' },
  { family: 'Bebas Neue', value: 'Bebas Neue' },
  { family: 'Righteous', value: 'Righteous' },
  { family: 'Permanent Marker', value: 'Permanent Marker' },
  { family: 'Caveat', value: 'Caveat' },
  { family: 'Shadows Into Light', value: 'Shadows Into Light' },
  // Serif Fonts
  { family: 'Baskerville', value: 'Libre Baskerville' },
  { family: 'Crimson Text', value: 'Crimson Text' },
  { family: 'Garamond', value: 'EB Garamond' },
  { family: 'Georgia', value: 'Georgia' },
  { family: 'Times New Roman', value: 'Times New Roman' },
  // Monospace Fonts
  { family: 'Courier New', value: 'Courier New' },
  { family: 'Fira Code', value: 'Fira Code' },
  { family: 'JetBrains Mono', value: 'JetBrains Mono' },
  { family: 'Space Mono', value: 'Space Mono' },
  // Handwriting Fonts
  { family: 'Indie Flower', value: 'Indie Flower' },
  { family: 'Architects Daughter', value: 'Architects Daughter' },
  { family: 'Comfortaa', value: 'Comfortaa' },
  { family: 'Kalam', value: 'Kalam' },
  { family: 'Gloria Hallelujah', value: 'Gloria Hallelujah' }
]

// Function to load Google Fonts
export const loadGoogleFonts = () => {
  const fontFamilies = fonts.map(font => font.value).join('&family=')
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}