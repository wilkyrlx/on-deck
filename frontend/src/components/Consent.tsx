import '../styles/Consent.css';

function Consent({ setConsent }: { setConsent: (consent: boolean) => void }) {
    

    function giveConsent(isConsenting: boolean) {
        if (!isConsenting) {
            // user is not consenting to data storage
            localStorage.setItem("cookieConsent", "false");
            setConsent(false);
        } else {
            // user is consenting to data storage
            localStorage.setItem("cookieConsent", "true");
            setConsent(true);
        }
    }

    return (
        <div className="consent-form">
            <p>This application stores team preference data locally, which is necessary to the
                function of this website. This data is NOT sold or shared in any way.
                By clicking yes, you consent to save your data. By clicking no, your preferences
                will not be saved.
            </p>
            <button onClick={() => giveConsent(true)} >Yes, I Consent</button>
            <button onClick={() => giveConsent(false)} >No, Don't Save</button>
        </div>
    );
}

export { Consent };