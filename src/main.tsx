import { render } from 'preact'
import App from './App.tsx'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

render(<App />, document.getElementById('app')!)
