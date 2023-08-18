import Form from "./components/Form.tsx";
import Navbar from "./components/Navbar.tsx";
import SettingsProvider from "./components/SettingsContext.tsx";
import {ComponentRouterProvider, ComponentRouteSlot} from "./components/ComponentRouter.tsx";
import PostDataProvider from "./components/PostDataContext.tsx";

export default function App() {

    return (
        <ComponentRouterProvider defaultRoute={<Form />}>
            <Navbar />
            <SettingsProvider>
                <PostDataProvider>
                    <ComponentRouteSlot />
                </PostDataProvider>
            </SettingsProvider>
        </ComponentRouterProvider>
    )
}
