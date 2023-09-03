import { render } from 'preact'
import App from './App.tsx'
import autoSetTheme from "./components/autoSetTheme.ts";
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

autoSetTheme();
render(<App />, document.getElementById('app')!)
