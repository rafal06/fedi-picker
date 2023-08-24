import {Button, Container, Spinner} from "react-bootstrap";
import {useContext, useEffect, useState} from "preact/hooks";
import {ComponentRouterContext} from "./ComponentRouter.tsx";
import Form from "./Form.tsx";
import {Account, fetchBoosts, fetchFollowers} from "./fetchPickerData.ts";
import {SettingsContext} from "./SettingsContext.tsx";
import ProfileCard from "./ProfileCard.tsx";

export default function PickerScreen() {
    const { setComponentRoute } = useContext(ComponentRouterContext);
    const { settings } = useContext(SettingsContext);
    const [state, setState] = useState<{
        loading: boolean,
        error: null | Error,
        data: null | Array<Account>,
        winner: null | Account,
    }>({
        loading: true,
        error: null,
        data: null,
        winner: null,
    });

    const drawWinner = (accountArr: Array<Account>, doSetState: boolean = false): Account => {
        const winner = accountArr[Math.floor(Math.random() * accountArr.length)];
        if (doSetState) setState({
            ...state,
            winner: winner,
        });
        return winner;
    }

    useEffect(() => {
        (async () => {
            const boosters: Array<Account> = settings.interactionFilter.boosted ? await fetchBoosts(new URL(settings.postUrl)) : [];
            let followers: Array<Account> = [];
            for (const acct of settings.mustFollow) {
                followers = followers.concat(await fetchFollowers(acct));
            }

            let filteredArr: Array<Account> = [];
            if (settings.mustFollow.length === 0) {
                filteredArr = boosters;
            } else {
                for (const booster of boosters) {
                    for (const follower of followers) {
                        if (booster.acct == follower.acct) {
                            filteredArr.push(booster);
                        }
                    }
                }
            }

            setState({
                loading: false,
                error: null,
                data: filteredArr,
                winner: drawWinner(filteredArr),
            });

        })().catch((err: Error) => {
            setState({
                loading: false,
                error: err,
                data: null,
                winner: null,
            });
        });
    }, []);

    if (state.loading) return (
        <CenterContainer>
            <Spinner className="mb-3" />
            <p>Loading data...</p>
            {/* TODO: Display info on what is being fetched at that moment */}
            <Button onClick={() => setComponentRoute(<Form />)}>Go back</Button>
        </CenterContainer>
    )

    if (state.error) return (
        <CenterContainer>
            <h2 class="fs-4">Error loading data</h2>
            <p>{state.error.message}</p>

            <div class="d-flex">
                <Button variant="outline-primary" onClick={() => setComponentRoute(<Form />)}>Go back</Button>
                <Button className="ms-3" onClick={() => {}}>Retry</Button>
            </div>
        </CenterContainer>
    )

    return (
        <CenterContainer>
            <h1 className="fs-2 mb-4">The winner is...</h1>
            <ProfileCard account={state.winner as Account} />
            <div class="mt-4 d-flex gap-3">
                <Button variant="outline-secondary"
                    onClick={() => setComponentRoute(<Form />)}>Go back</Button>
                <Button variant="outline-secondary"
                    onClick={() => drawWinner(state.data as Array<Account>, true)}>Redraw winner</Button>
            </div>
        </CenterContainer>
    )
}

function CenterContainer(props: any) {
    return (
        <Container as="main"
                   className="p-3 d-flex flex-column justify-content-center align-items-center"
                   style={{maxWidth: '960px', marginTop: '200px'}}>
            {props.children}
        </Container>
    )
}
