import { Translation } from "../models";

export default function useT(t: string | string[] | Translation | undefined, escapeHtml=true) {
    if (!t) return 'ERROR: Translation missing'
    if (escapeHtml) {
        return t.toString()
    } else {
        const HtmlToReactParser = require('html-to-react').Parser;

        const htmlToReactParser = new HtmlToReactParser();
        const reactElement = htmlToReactParser.parse(t.toString());

        return reactElement
    } 
}