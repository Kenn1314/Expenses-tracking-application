
function consoleGet(text, show) {

    try {

        if (show == true) {
            console.log(text);
        }
        
    } catch(e) {
        return e;
    }
}

export { consoleGet };
