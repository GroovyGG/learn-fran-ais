import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="h-6 w-6 text-primary"></Menu>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}