/**
 * Saves a cookie with a name and content - will not expire
 * Adapted from https://www.w3schools.com/js/js_cookies.asp
 * @param cname - cookie name to save under
 * @param cvalue - cookie value to associate with name
 */
function setCookie(cname: string, cvalue: string) {
    const d = new Date();
    // cookie expires in 2038
    d.setTime(2147483647);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

/** 
 * Gets a saved cookie if it exists. Adapted from https://www.w3schools.com/js/js_cookies.asp
 * @param cname cookie name to look for
 * @returns the contents of the cookie with matching cname
 */
function getCookie(cname: string): string {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { setCookie, getCookie }