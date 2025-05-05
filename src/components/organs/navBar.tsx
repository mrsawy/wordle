"use client"

import SettingsDialog from "./SettingsDialog";



export default function NavBar() {
    return (
        <div className="flex flex-row justify-center  flex-nowrap gap-1 bg-zinc-800 ">
            <div className="container flex flex-row justify-between items-center w-full max-w-9xl px-4 py-2">
                <div className="flex items-center gap-2">
                </div>
                <SettingsDialog />
            </div>
        </div>
    );
}
