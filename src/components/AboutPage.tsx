import {Container} from "react-bootstrap";

export default function AboutPage() {
    return (
        <Container as="main" className="p-3 mt-4" style={{maxWidth: '960px'}}>
            <h1>About</h1>
            <p>If you're here, then you probably know what this app is for. Though if you don't, this app is for picking winners in giveaways or contests on Mastodon (and in the future on other <a
                href="https://en.wikipedia.org/wiki/Fediverse" target="_blank">Fediverse</a> platforms).</p>
            <h2>Who is this app for?</h2>
            <p>Mainly for smaller artists and other content creators, who live off of commissions and want to gain attention by running a giveaway or contest, in exchange for boosts and optionally follows. I believe such people bring value to the Fediverse, and they should be welcome there. I am aware that this tool could be also used by corporations to advertise themself, but unfortunately I can't stop them from doing that.</p>
            <h2>Does it collect any data?</h2>
            <p>No, this app runs entirely in your browser, and doesn't store permanently nor send any data to "the cloud". If you want to make sure yourself, the source code is freely available under the MIT license. The link is in the header.</p>
        </Container>
    )
}