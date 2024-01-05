const string = (value) => typeof value === 'string' || value instanceof String
const array = (value) => Array.isArray(value)

const isNotEmpty = (value, inputName) => {
    const exists = value !== null && value !== undefined
    let RULE = exists
    if (string(value)) {
        RULE = exists && value.trim().length > 0
    } else if (array(value)) {
        RULE = exists && value.length > 0
    }
    
    return {
        validate: RULE,
        message: RULE ? `Validation success` : `${inputName.replaceAll('_',' ')} is required`
    }
} 

const isEmail = (value, inputName) => {
    const REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const RULE = String(value).toLowerCase().match(REGEX)
    return {
        validate: RULE,
        message: RULE ? `Validation success` : `${inputName.replaceAll('_',' ')} is required`
    }
}

const isPassword = (value, inputName) => {

    if (value.length < 8) {
        return {
            validate: false,
            message: `${inputName.replaceAll('_',' ')} must be more than 7 characters`
        }
    }

    const RULE_NUMBER = /\d/.test(value)
    if (!RULE_NUMBER) {
        return {
            validate: false,
            message: `${inputName.replaceAll('_',' ')} must includes number`
        }
    }
    
    return {
        validate: true,
        message: `Validation success`
    }
}

export {
    isNotEmpty,
    isEmail,
    isPassword
}