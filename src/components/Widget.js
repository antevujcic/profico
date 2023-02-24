import { useState, useEffect, useRef } from 'react'
import '../assets/style/Widget.scss'

const Widget= ({ apiKey, setError }) => {

    const [data, setData] = useState([])

    const page = useRef(1)

    useEffect(() => {
        const getData = () => {

            fetch(`https://newsapi.org/v2/top-headlines?language=en&category=general&page=${page.current}&pageSize=20&apiKey=${apiKey}`)
                .then(resp => {
                    if (!resp.ok) {
                        throw Error(resp.status);
                    }
                    return resp.json()
                })
                .then(json => {
                    setData(prev => [...prev, ...json.articles]);
                    page.current += 1
                })
                .catch(e => {
                    if(e.message === "429") {
                        setError(1)
                    }
                })
                
        }
    
    
        const handleScroll = () => {
    
            let element = document.getElementById("widget-box")
            
            if(element.clientHeight + element.scrollTop + 1 >= element.scrollHeight) {
                getData(page.current);
            }
        }
        
        getData(page.current)
        
        let element = document.getElementById("widget-box")

        if(element) {

            element.addEventListener("scroll", handleScroll)
        
            return () => element.removeEventListener("scroll", handleScroll)
        }
    }, [apiKey, setError])

    return (
        <div className='widget-wrapper'>
            <div className='widget-header'>
                <div className='pulse'></div>
                <p>Latest news</p>
            </div>
            <div id="widget-box">
                { data &&
                    data.map((article, index) => (
                        <a href={article.url} key={index} className="widget-element">
                            <p className='widget-element-time'>{new Date(article.publishedAt).getHours()} : {new Date(article.publishedAt).getMinutes()}</p>
                            <p className='widget-element-title'>{article.title}</p>
                        </a>
                    ))
                }
            </div>
            <div className='widget-footer'>
                <a href="/">See all news
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.48025 0.45193C1.30001 0.271688 1.00778 0.271688 0.827537 0.45193L0.338002 0.941466C0.15776 1.12171 0.157759 1.41394 0.338001 1.59418L4.66256 5.91874C4.70762 5.9638 4.70762 6.03686 4.66256 6.08192L0.338328 10.4061C0.158085 10.5864 0.158086 10.8786 0.338328 11.0589L0.827537 11.5481C1.00778 11.7283 1.30001 11.7283 1.48025 11.5481L6.37561 6.65271C6.73609 6.29223 6.73609 5.70777 6.37561 5.34729L1.48025 0.45193Z" fill="#1D1D1B"/>
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default Widget