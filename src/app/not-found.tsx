import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 | Page Not Found | Highflying Themes",
    description: "This Page dosent exist",
  };
  

export default function RootNotFound(){
    return(
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
   
    )
}