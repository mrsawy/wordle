"use client";
import Icons from "@/components/ui/icons";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogHeader,
    ResponsiveDialogTrigger
} from "@/components/molecules/ResponsiveDialog";
import { DialogTitle } from "@/components//ui/dialog";
import { AddNewWordForm } from "./AddNewWordForm";
import { Button } from "@/components/ui/button";
const AddNewWordDialog = () => {
    return <ResponsiveDialog
        className="z-50" >
        <ResponsiveDialogTrigger asChild>
            <div className="flex mt-16">
                <Button
                    variant="outline" className="w-auto  cursor-pointer m-auto ">
                    <Icons.add className="mr-2 !h-7 w-7!" />
                    Add New Word
                </Button>
            </div>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="gap-0 bg-white  sm:w-[31.25rem] p-4">
            <ResponsiveDialogHeader className="z-10  justify-between hidden sm:flex">
                <DialogTitle>Add New Word</DialogTitle>
                <ResponsiveDialogClose />
            </ResponsiveDialogHeader>
            <AddNewWordForm className="mt-9" />
        </ResponsiveDialogContent>
    </ResponsiveDialog>
}

export default AddNewWordDialog;