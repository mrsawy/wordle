import Icons from "@/components/ui/icons";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogHeader,
    ResponsiveDialogTrigger
} from "../molecules/ResponsiveDialog";
import { DialogTitle } from "../ui/dialog";
import useGeneralStore from "@/store/generalSore";
const SettingsDialog = () => {

    const { isWon, isGameOver, isSettingsModalOpen, setIsSettingsModalOpen } = useGeneralStore()

    return <ResponsiveDialog open={isSettingsModalOpen} className="z-50" onOpenChange={(open) => { setIsSettingsModalOpen(open) }}>
        <ResponsiveDialogTrigger asChild>
            <Icons.settings className="size-10 md:size-14 text-zinc-300 border-zinc-50 hover:cursor-pointer" />
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="gap-0 bg-white p-0 sm:w-[31.25rem]">
            <ResponsiveDialogHeader className="z-10 flex justify-between">
                <DialogTitle>Settings</DialogTitle>
                    <ResponsiveDialogClose />
            </ResponsiveDialogHeader>
            {isWon && isGameOver ? "you win" : "You Lost"}
        </ResponsiveDialogContent>
    </ResponsiveDialog>
}

export default SettingsDialog;