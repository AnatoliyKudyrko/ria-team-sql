let forgotCode = '';
let timeout;
function set(code) {
        forgotCode = code;
        clearTimeout(timeout);
        setTimeout(clear, 15 * 60 * 1000);
    }

function check(code) {
        return forgotCode === code;
    }

function clear() {
        forgotCode = '';
    
}

module.exports = {set, check, clear};
