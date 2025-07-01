'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            onClick={() => router.push('/myevents')}
            className="flex items-center gap-2 mb-6 mx-auto w-auto text-xs sm:text-base px-2 sm:px-4 py-2 sm:py-3"
        >
            <ChevronLeft className="h-4 w-4" />
            Вернуться к списку
        </Button>
    );
} 