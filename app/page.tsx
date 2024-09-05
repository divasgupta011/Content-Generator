import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <header className="flex p-5 border shadow-md fixed w-screen justify-between items-center ">
        <Image src='./logoipsum-332.svg' alt='logo' width={100} height={100}/>
        <nav className="flex items-center gap-7 m-5">
            <SignedOut>
            <Button className="text-lg"><SignInButton /></Button>
            </SignedOut>
          <UserButton />
        </nav>
      </header>
      <div className="justify-center items-center h-screen flex flex-col">
        <h1 className="text-4xl font-bold mb-6 text-center">Content Generator</h1>
        <Link href="/dashboard">
          <Button className="px-6 py-2">Get Started</Button>
        </Link>
        <div>

        </div>
      </div>
      <footer className="text-center p-4 bg-gray-100">
        <p>&copy; {new Date().getFullYear()} Content Generator</p>
      </footer>
    </div>
  );
}
