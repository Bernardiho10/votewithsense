import { MetaFunction, LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";


export const Loader: LoaderFunction = ({ request }: LoaderFunctionArgs) => {
    console.log(request.headers.get("User-Agent"))
    return { hello: "world" }
}

export default function MobileHomePage() {
    return (
        <div> This is the mobile</div>
    )
}

export const meta: MetaFunction = () => {
    return [
        { title: "Vote with sense App" },
        { name: "description", content: "Welcome to Vote with sense, we are just sharing our views!" },
    ];
}