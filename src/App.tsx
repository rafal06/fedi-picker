import Form from "./components/Form.tsx";
import Navbar from "./components/Navbar.tsx";
import SettingsProvider from "./components/SettingsContext.tsx";

export default function App() {

    return (
        <>
            <Navbar />
            <SettingsProvider>
                <Form />
            </SettingsProvider>
        </>
    )
}
