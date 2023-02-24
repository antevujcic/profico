import { useEffect, useRef, useState } from 'react'
import '../assets/style/Header.scss'
import Categories from './Categories'
import logo from '../assets/img/logo.svg'
import searchIcon from '../assets/img/search.svg'

const SearchBar= ({ apiKey, setError, query, setQuery, setSearched, category, setCategory, setWidgetToggle, bookmarks }) => {

    const [hamby, setHamby] = useState(0)

    const searchTerm = useRef("");

    useEffect(() => {
        if(hamby) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [hamby])

    useEffect(() => {
        document.body.style.overflow = "auto"
        setHamby(0)
    }, [category])

    useEffect(() => {

        const getData = (param) => {

            fetch(`https://newsapi.org/v2/everything?searchIn=title&language=en&sortyBy=relevancy&pageSize=16&q=${param}&apiKey=${apiKey}`)
                .then(resp => {
                    if (!resp.ok) {
                        throw Error(resp.status);
                    }
                    return resp.json()
                })
                .then(info => {
                    setSearched(info.articles);
                })
                .catch(e => {
                    if(e.message === "429") {
                        setError(1)
                    }
                })
    
        }

        if(query !== ""){
            const timeOutId = setTimeout((() => {
                searchTerm.current = query.replace(/[^a-zA-Z0-9]+/ig, "+");
                getData(searchTerm.current)
                }), 300);
                
            return () => clearTimeout(timeOutId);
        }
    }, [query, apiKey, setError, setSearched]);

    return (
        <header className={(hamby ? "active" : "")}>
            <div className='header-wrapper'>
                <a href="/" className='logo'>
                    <img src={logo} alt="" />
                </a>

                <div className='hamby-toggle' onClick={() => setHamby(prev => prev ? 0 : 1)}>
                    <span></span>
                </div>

                <div className="search-bar">
                    <img src={searchIcon} alt="" />
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                document.body.style.overflow = "auto"
                                setHamby(0)
                                setWidgetToggle(0)
                            }
                        }} 
                        placeholder="Search News" 
                    />
                    <div 
                    className='button'
                    onClick={() => {
                        document.body.style.overflow = "auto"
                        setHamby(0)
                        setWidgetToggle(0)
                    }}
                    >Search</div>
                </div>

                <div className='empty'></div>

                <div className="mobile-nav">
                    <Categories 
                        category={category} 
                        setCategory={setCategory} 
                        bookmarks={bookmarks}
                    />
                </div>
            </div>
        </header>
    );
}

export default SearchBar;