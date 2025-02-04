import type { LinksFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node"

export const Loader: LoaderFunction = ({ request }: LoaderFunctionArgs) => {
    console.log(request.headers.get("User-Agent"))
    return { hello: "world" }
}

export default function DesktopHomePage () {
  return (
    <div>This application is for mobile and table users only, Please use either</div>
  )
}


export const Links: LinksFunction = () => [
        { rel: "stylesheet", href: "/styles/tailwind.css" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" },
    ]