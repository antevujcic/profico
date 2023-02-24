import '../assets/style/ErrorPopup.scss';

const ErrorPopup= ({ error }) => {

    return (
        <div className="overlay">
            <div className="popup-wrapper">
                <p>{ error === 1 ? "You exceeded 100 API calls limit, please change apiKey in App.js" : "There was some other error, please refresh the page"}</p>
            </div>
        </div>
    );
}

export default ErrorPopup;