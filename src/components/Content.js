import Widget from "./Widget"
import '../assets/style/Content.scss'
import logo from "../assets/img/logo.jpg"


const Content= ({ apiKey, error, setError, articles, category, query, searched, widgetToggle, setWidgetToggle, bookmarks, setBookmarks }) => {
    
    const handleBookMark = (article) => {
        let i = -1
        bookmarks.forEach((mark, index) => {
            if(mark.url === article.url) {
                i = index
            }
        })
        if(i > -1) {
            setBookmarks(bookmarks.filter((single, index) => i !== index))
        } else {
            setBookmarks(prev => [...prev, {url: article.url, urlToImage: article.urlToImage, title: article.title}])
        }
    }

    const iterateBookmarks = (article) => {
        let counter = 0
        bookmarks.map((map, i)=> {
            if(map.url === article.url) {
                counter ++
            }
            return counter
        })
        if(counter) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="content">

            <div className="mobile-toggle">
                <p className={(widgetToggle ? "" : "active")} onClick={() => setWidgetToggle(0)}>Featured</p>
                <p className={(widgetToggle ? "active" : "")} onClick={() => setWidgetToggle(1)}>Latest</p>
            </div>

            {(!query &&
            (
                <p className="content-title">{ category ? category : "News" }</p>
            )) || (query && (
                <p className="content-title">Searched</p>
            ))
            }
                
            { !articles.length && (
                    <p>Loading...</p>
                )
            }
            <div className={"content-article-wrapper " + (widgetToggle ? "latest" : "featured")}>
                
                <Widget 
                    apiKey={apiKey}
                    error={error}
                    setError={setError} 
                />

                { articles &&
                !category &&
                category !== "bookmarks" &&
                !query &&
                articles
                .filter(
                    (article, index, arr) => {
                        let sameArticle = 0
                        arr.forEach((element, i) => {
                            if(element.url === article.url && i > index) sameArticle++
                        })
                        if(sameArticle > 0){
                            return false
                        } else { 
                            return true
                        }
                    }
                )
                .sort((a,b) => (
                    new Date(b.publishedAt) - new Date(a.publishedAt)
                ))
                .slice(0, 16).map((article, index) => (
                    <div className="article-wrapper" key={index}>
                        <a href={article.url} target="_blank" rel="noreferrer" className="article-wrapper-link">
                            <img src={article.urlToImage ? article.urlToImage : logo} alt=""/>
                            <p className="article-category">{article.category}</p>
                            <p className="article-title">{article.title}</p>
                            <p className="article-author">{article.author}</p>
                        </a>
                        {
                            (iterateBookmarks(article) && (
                                <div className="bookmark-icon added" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M716 451 610 345l42-43 64 64 148-149 43 43-191 191ZM200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Z"/></svg>                                        
                                </div>
                            ))
                            ||
                            (!iterateBookmarks(article) && (
                                <div className="bookmark-icon" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z"/></svg>
                                </div>
                            ))
                        }
                    </div>
                ))
                }
                { articles &&
                category &&
                category !== "bookmarks" &&
                !query && 
                articles
                .filter(
                    (article, index, arr) => 
                        article.category === category
                )
                .sort((a,b) => (
                    new Date(b.publishedAt) - new Date(a.publishedAt)
                ))
                .slice(0, 16).map((article, index) => (
                    <div className="article-wrapper" key={index}>
                        <a href={article.url} target="_blank" rel="noreferrer" className="article-wrapper-link">
                            <img src={article.urlToImage ? article.urlToImage : logo} alt=""/>
                            <p className="article-category">{article.category}</p>
                            <p className="article-title">{article.title}</p>
                            <p className="article-author">{article.author}</p>
                        </a>
                        {
                            (iterateBookmarks(article) && (
                                <div className="bookmark-icon added" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M716 451 610 345l42-43 64 64 148-149 43 43-191 191ZM200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Z"/></svg>                                        
                                </div>
                            ))
                            ||
                            (!iterateBookmarks(article) && (
                                <div className="bookmark-icon" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z"/></svg>
                                </div>
                            ))
                        }
                    </div>
                ))
                }
                { bookmarks &&
                category &&
                category === "bookmarks" &&
                !query && 
                bookmarks
                .slice(0, 16).map((article, index) => (
                    <div className="article-wrapper" key={index}>
                        <a href={article.url} target="_blank" rel="noreferrer" className="article-wrapper-link">
                            <img src={article.urlToImage ? article.urlToImage : logo} alt=""/>
                            <p className="article-category">{article.category}</p>
                            <p className="article-title">{article.title}</p>
                            <p className="article-author">{article.author}</p>
                        </a>
                        {
                            (iterateBookmarks(article) && (
                                <div className="bookmark-icon added" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M716 451 610 345l42-43 64 64 148-149 43 43-191 191ZM200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Z"/></svg>                                        
                                </div>
                            ))
                            ||
                            (!iterateBookmarks(article) && (
                                <div className="bookmark-icon" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z"/></svg>
                                </div>
                            ))
                        }
                    </div>
                ))
                }
                {searched &&
                query &&
                searched.map((article, index) => (
                    <div className="article-wrapper" key={index}>
                        <a href={article.url} target="_blank" rel="noreferrer" className="article-wrapper-link">
                            <img src={article.urlToImage ? article.urlToImage : logo} alt=""/>
                            <p className="article-title no-category">{article.title}</p>
                            <p className="article-author">{article.author}</p>
                        </a>
                        {
                            (iterateBookmarks(article) && (
                                <div className="bookmark-icon added" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M716 451 610 345l42-43 64 64 148-149 43 43-191 191ZM200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Z"/></svg>                                        
                                </div>
                            ))
                            ||
                            (!iterateBookmarks(article) && (
                                <div className="bookmark-icon" onClick={() => handleBookMark(article)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 936V271q0-24 18-42t42-18h290v60H260v574l220-93 220 93V511h60v425L480 816 200 936Zm60-665h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z"/></svg>
                                </div>
                            ))
                        }
                    </div>
                ))    
                }
                {
                    !searched.length && query && (<p>0 results matching this search</p>)
                }
            </div>
        </div>
    );
}

export default Content;