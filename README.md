Star Wars Archives

NextJS app to display Star Wars data from the [SWAPI](https://swapi.dev/).

The project is built with:
- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)

## Getting Started

Install Dependencies with:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run end-to-end tests with:

```bash
npm run e2e
```

Run unit tests with:

```bash
npm run test
```

## Deploy with Docker

Build the image with:

```bash
docker build -t star-wars-archives .
```

Run the container with:

```bash
docker run -p 3000:3000 star-wars-archives
```
