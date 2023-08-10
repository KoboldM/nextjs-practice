import AnimeList from "./components/AnimeList/animelist"
import Footer from "./components/Footer/footer"
// import Header from "./components/Header/header"

export default function Home() {
    return (
        <main className="bg-slate-800 flex flex-col items-center min-h-screen justify-between">
            {/* <Header/> */}
            <AnimeList/>
            <Footer/>
        </main>
    )
}
