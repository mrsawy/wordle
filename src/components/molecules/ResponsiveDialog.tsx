import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useMediaQuery from "@/hooks/use-media-query"

const DESKTOP_QUERY = '(min-width: 640px)';

interface BaseProps {
    children?: React.ReactNode;
    className?: string;
}

interface ResponsiveDialogRootProps extends BaseProps {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange?: (open: boolean) => void;
}

interface ResponsiveDialogTriggerProps extends BaseProps {
    asChild?: boolean;
}

export function ResponsiveDialog({
    children,
    ...props
}: ResponsiveDialogRootProps) {
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const Root = isDesktop ? Dialog : Drawer;
    return <Root {...props}>{children}</Root>;
}

export function ResponsiveDialogTrigger({
    children,
    ...props
}: ResponsiveDialogTriggerProps) {
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const ResponsiveDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;
    return (
        <ResponsiveDialogTrigger {...props}>{children}</ResponsiveDialogTrigger>
    );
}

export function ResponsiveDialogContent({ children, ...props }: BaseProps) {
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const ResponsiveDialogContent = isDesktop ? DialogContent : DrawerContent;
    return (
        <ResponsiveDialogContent {...props}>{children}</ResponsiveDialogContent>
    );
}

export function ResponsiveDialogHeader({ children, ...props }: BaseProps) {
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const ResponsiveDialogHeader = isDesktop ? DialogHeader : DrawerHeader;
    return <ResponsiveDialogHeader {...props}>{children}</ResponsiveDialogHeader>;
}

export function ResponsiveDialogClose({ ...props }: BaseProps) {
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const ResponsiveDialogClose = isDesktop ? DialogClose : DrawerClose;
    return <ResponsiveDialogClose  {...props} />;
}