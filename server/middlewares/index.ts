import {
	handleCors,
	handleBodyRequestParsing
} from "./common";
import { handleApiDocs } from './api-docs';

export default [handleCors, handleBodyRequestParsing, handleApiDocs];
