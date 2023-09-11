"use client"

import qs from "query-string"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");


    const [value, setValue] = useState(name || "");

    // this debounce is used to prevent the search to be triggered on every keystroke
    // this 500 indicate 0.5s or 500ms
    const debouncedValue = useDebounce<string>(value, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        const url   = qs.stringifyUrl({
            url: window.location.href,
            query,
        },{ skipEmptyString: true, skipNull: true });   

        router.push(url);
        
    },[debouncedValue, router, categoryId])

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input 
                onChange={onChange}
                value={value}
                placeholder="Search..."
                className="pl-10 bg-primary/10"
            />
        </div>
    )
}