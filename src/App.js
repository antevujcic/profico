import './assets/style/App.scss'
import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Categories from './components/Categories'
import Content from './components/Content'
import ErrorPopup from './components/ErrorPopup'
import bannerbackground from './assets/img/banner-background.svg'

function App() {

  const apiKey = "b196e89a253e4f6888cc98edb071cad5"

  const [category, setCategory] = useState("")

  const [allArticles, setAllArticles] = useState([])

  const [error, setError] = useState(0)

  const [banner, setBanner] = useState(1)

  const [searched, setSearched] = useState([])

  const [query, setQuery] = useState('')

  const [widgetToggle, setWidgetToggle] = useState(0)

  const [bookmarks, setBookmarks] = useState([])

  const categories = useRef(["general", "business", "health", "science", "sports", "technology", "bookmarks"])

  useEffect(() => {
    setQuery('')
  }, [category])

  useEffect(() => {

      categories.current.map(category => {
        
        const getData = async () => {
          try{
            const resp = await fetch(`https://newsapi.org/v2/top-headlines?language=en&category=${category}&page=1&pageSize=16&apiKey=${apiKey}`)
            
            if (!resp.ok) {
              throw new Error(resp.status)
            }
        
            const json = await resp.json()

            json.articles.map(e => {
              return e.category = category
            })
        
            setAllArticles(prev => [...prev, ...json.articles])
          } catch (e){
            if(e.message === "429") {
              setError(1)
            }
          }
        }

        return getData()
        
      })

  }, [])

  return (
    <div className="App">
      { error > 0 && (
        <ErrorPopup 
        error={error}
      />
      )}

      <div className={"top-banner-wrapper " + (!banner ? "hide" : "")}>
        <div className="top-banner" style={{backgroundImage: `url(${bannerbackground})`}}>
          <div className="banner-text">
            <p>Make MyNews your homepage</p>
            <p>Every day discover what’s trending on the internet!</p>
          </div>
          <div className="banner-buttons">
            <p onClick={() => setBanner(0)}>Get</p>
            <p onClick={() => setBanner(0)}>No, thanks</p>
          </div>
        </div>
      </div>

      <Header 
        apiKey={apiKey}
        setError={setError}
        query={query}
        setQuery={setQuery}
        setSearched={setSearched}
        category={category} 
        setCategory={setCategory} 
        setWidgetToggle={setWidgetToggle}
        bookmarks={bookmarks}
      />
      <div className='content-wrapper'>
        <Categories 
          category={category} 
          setCategory={setCategory}
          bookmarks={bookmarks}
        />
        <Content 
          apiKey={apiKey} 
          error={error}
          setError={setError}
          category={category} 
          articles={allArticles}
          query={query}
          searched={searched}
          widgetToggle={widgetToggle}
          setWidgetToggle={setWidgetToggle}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
        />
      </div>
    </div>
  );
}

export default App;
