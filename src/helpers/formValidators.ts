export function isValidEmail(email: string): boolean {
    // Remove all spaces from the email string
    email = email.replace(/\s+/g, '');

    // Regular expression for validating an email
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Test the email string against the regex
    return regex.test(email);
}

export function isValidPassword(password: string): boolean {
    return isNineCharacters(password) &&
           hasOneCapitalLetter(password) &&
           containsNumber(password) &&
           containsSpecialCharacter(password);
}

export function isNineCharacters(string: string): boolean {
    return string.length >= 9;
}


export function hasOneCapitalLetter(string: string): boolean {
    return /[A-Z]/.test(string);
}

export function containsNumber(string: string): boolean {
    return /\d/.test(string);
}


export function containsSpecialCharacter(string: string): boolean {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(string);
}
