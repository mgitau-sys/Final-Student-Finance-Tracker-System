/**
 * Safely compiles a raw user text pattern into a live RegExp object
 * Wraps within try/catch block to prevent application crash on broken regex text.
 */
export function compileSearchRegex(patternString, ignoreCase) {
    if (!patternString.trim()) return null;
    
    try {
        const flags = ignoreCase ? "i" : "";
        // Safely extract boundaries if user wrote native literal notation slashes e.g. /coffee/i
        let processedPattern = patternString;
        if (patternString.startsWith("/") && patternString.lastIndexOf("/") > 0) {
            processedPattern = patternString.substring(1, patternString.lastIndexOf("/"));
        }
        return {
            regex: new RegExp(processedPattern, flags),
            error: null
        };
    } catch (error) {
        return {
            regex: null,
            error: error.message
        };
    }
}

/**
 * Helper to visually inject high-visibility <mark> structures into text matches without damaging accessibility parameters
 */
export function highlightTextMatches(text, regex) {
    if (!regex) return text;
    // Prevent rendering infinite loop structures on raw empty match variables
    if (regex.test("")) return text; 
    
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
}