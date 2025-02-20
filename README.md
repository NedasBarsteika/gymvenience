# Gymvenience

Šiuolaikiniame pasaulyje daugelis žmonių susiduria su fizinio aktyvumo trūkumu. Sėdimas darbas, užimtumas ir nežinia, nuo ko pradėti, tampa pagrindinėmis priežastimis, kodėl žmonės vengia sporto ar sveikos gyvensenos. Be to, net ir tie, kurie nusprendžia pradėti sportuoti, dažnai susiduria su iššūkiais ieškodami tinkamų trenerių, kokybiškos sportinės įrangos ar maisto papildų, kurie padėtų pasiekti norimus rezultatus.

Mūsų komanda siekia sukurti inovatyvią internetinę platformą, kuri suteiks vartotojams galimybę lengvai pradėti ir palaikyti aktyvų gyvenimo būdą. Ši svetainė bus visapusiškas sprendimas tiek pradedantiesiems, tiek pažengusiems sporto entuziastams, apjungiantis keletą svarbiausių funkcijų į vieną sistemą.

### Platformoje rasite:

* Elektroninę parduotuvę
* Trenerių rezervavimo sistemą
* Trenerių valdymo sistemą


### Naudojamos technologijos
- Front-end React su TypeScript
- Back-end su ASP.NET C#
  - Jo kodą galite rasti [čia](https://github.com/NedasBarsteika/gymvenience-backend)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
nience-backend)
