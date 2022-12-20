import '../styles/Consent.css';


/**
 * Form that asks the user consent to store data in localStorage
 * After the user consents/does not consent, the form dissapears
 * @param setConsent - function to set the consent state in the parent component
 */
function Consent({ setIsConsentGranted }: { setIsConsentGranted: (consent: boolean) => void }) {
    
    /**
    * Sets the user's consent to true or false, and hides the consent form.
    * @param isConsenting - whether or not the user is consenting to data storage
    */
    function giveConsent(isConsenting: boolean) {
        if (!isConsenting) {
            // user is not consenting to data storage
            localStorage.setItem("cookieConsent", "false");
            localStorage.removeItem("preferences");
        } else {
            // user is consenting to data storage
            localStorage.setItem("cookieConsent", "true");
        }
        // hide the consent form either way
        setIsConsentGranted(isConsenting);
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