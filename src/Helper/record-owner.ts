export const getOwner = (text: string) => {
    const pattern = /<([^>]+)>/;
    const result = text.match(pattern);
    const extractedText = result ? result[1] : null;
    return extractedText;
}