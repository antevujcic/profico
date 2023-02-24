# MyNews App

### Running code

As requested, this code can be run with the following:

`npm install`

`npm start`

## My overview

### API

#### Pros/cons of [News API](https://newsapi.org/)

Reasons why I chose this API:

##### Pros:

- It looks to me like the provided design was created around this API; it has exactly the same categories, except it looks like you missed one (entertainment) - this is the biggest reason I went with this API (NY Times API doesn't seem to have the same categories, it has tags, but each article has usually more than 10 tags, therefore it would be hard to differentiate)
- It's very simple, pretty straightforward, and has few request parameters; overall simplicity

#### Cons (too many):

- Each API Key is limited to only 100 requests per day - this is horror (I created 5 accounts and the website tagged my IP as a bot)
- Endpoints are not very well thought thru, for example [Everything](https://newsapi.org/docs/endpoints/everything) is a great endpoint but for some reason, it does not give you **category** of the article, so I had to use both Everything and [Sources](https://newsapi.org/docs/endpoints/sources) - it's a bit silly and redundant, but for task purposes it served ok
- It does not provide Breaking news
- Even tho I'm only showing English results, sometimes API will show one article that is in Chinese or Hindi
- Sometimes there are broken urlToImg links that will not display photo

### My thoughts on the provided design

It's great for task purposes, but it does have some logical issues

- Widget (with infinite scroll) should not be displayed on the **home** "category", simply because the widget is already showing the latest news (as is the home category) -> I've added it on all categories, but this is something I would disagree on in a real project
- "Make this website my homepage"-banner (above header): 
    - I don't think this is possible due to the security risk of phishing
    - I've added buttons that simply hide that banner with some nice animation
    - Also design for this banner on Mobile is not provided? I hid it as it's shown on the design, I don't know if this is a mistake
- Are there "hover" effects in this Figma design? I didn't find any (maybe it's my fault), however, I've added some effects and animations just to breathe some life into an app
- Overall it's a nice design for practicing purposes, but adding more details would make it more challenging (and better)

### Things I would point out

- I've covered some errors and troubles with API:
    - If you exceed 100 API requests, you will get a small Popup banner with a message what to do (you need to change Api Key in App.js)
    - If there are other errors while fetching data, it will show a different message
    - If there are missing Images (urlToImg) I've added a default photo to be displayed (it has the MyNews logo as the Image; same as the App logo)
- Added some animations to make the web a bit more "alive" (responsive/mobile animations are a bit fancier)
- Webapp is tested in Chrome & Firefox (I do not have access to Safari at the moment, therefore there is a possibility of some flaws in CSS)
- Bookmarks are created to be as intuitive as possible, when you hover over an article it will show you white icon if it's not selected, and gold-ish color if selected. Also if there are no bookmarked articles, there will be no Favorites category. Icons are also "standard" looking icons from Google.

## Thank You for reviewing!