import AnimeList from "./components/AnimeList/animelist"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-slate-500 min-h-screen">
        <AnimeList/>
    </main>
  )
}
