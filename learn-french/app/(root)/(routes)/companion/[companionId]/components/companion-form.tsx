 "use client";

 import * as z from "zod";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";

 interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
 }
 
 const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required.",
    }),
    description: z.string().min(1,{
        message: "Description is required.",
    }),
    instructions: z.string().min(200,{
        message: "Instructions require at least 200 characters.",
    }),
    seed: z.string().min(200,{
        message: "Seed is require at lease 200 characters.",
    }),
    src: z.string().min(1,{
        message: "Image is required.",
    }),
    categoryId: z.string().min(1,{
        message: "Category is required.",
    }),
    })
 

 export const CompanionForm = ({
    categories,
    initialData
 }: CompanionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        }

    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div className="h-full, p-4 space-y-2  max-w-3xl mx-auto">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8 pb-10">
                    <div className="space-y-2 w-full col-span-2">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Info
                            </h3>
                            <p className="text-sm text-muted-foreground ">
                                general information about your companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField 
                        name="src"
                        render={({field}) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                                <FormControl>
                                    <ImageUpload 
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem className="col-span-2 md:col-span-1 ">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>  
                                        <Input
                                            disabled={isLoading} />
                                    </FormControl>
                                </FormItem>
                            )}
                            >

                        </FormField>

                    </div>
                </form>
            </Form>
            
        </div>
    );
 }