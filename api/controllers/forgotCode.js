let forgotCode = '';
function set(code) {
        forgotCode = code;
    }

function check(code) {
        return forgotCode === code;
    }

function clear() {
        forgotCode = '';
    
}

module.exports = {set, check, clear};
